import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Booking } from '../types';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required scopes
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedUser = user;
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedUser = null;
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Google Sign-In pop up
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getCachedUser = () => {
  return cachedUser;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedUser = null;
};

// Append a row to the Google Sheet
export const appendRowToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  rowValues: string[]
) => {
  const range = 'A1'; // Appends to the first sheet automatically
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [rowValues]
    })
  });

  if (!res.ok) {
    throw new Error(`Failed to write to Sheet: ${await res.text()}`);
  }
};

// Create a new Google Sheet
export const createNewSheet = async (accessToken: string): Promise<string> => {
  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: 'Danh sách Yêu Cầu Sửa Máy Lọc Nước 24H'
      }
    })
  });

  if (!res.ok) {
    throw new Error(`Failed to create spreadsheet: ${await res.text()}`);
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;

  // Initialize header row
  await appendRowToSheet(accessToken, spreadsheetId, [
    'Mã đơn',
    'Họ tên khách hàng',
    'Số điện thoại',
    'Quận/Khu vực',
    'Tình trạng sự cố / Yêu cầu',
    'Thời gian gửi'
  ]);

  return spreadsheetId;
};

// Send an email via Gmail API
export const sendBookingEmail = async (
  accessToken: string,
  toEmail: string,
  booking: Booking,
  symptomName: string
) => {
  const subject = `[ĐƠN MỚI] Yêu cầu sửa máy lọc nước - ${booking.fullName} (${booking.district})`;
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="background-color: #0070c0; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">Yêu cầu sửa máy lọc nước mới</h2>
      </div>
      <div style="padding: 24px; color: #334155; line-height: 1.6;">
        <p>Chào bạn, hệ thống Sửa Máy Lọc Nước 24H vừa tiếp nhận một yêu cầu sửa chữa mới từ khách hàng:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-weight: bold; width: 35%; color: #64748b;">Mã yêu cầu:</td>
            <td style="padding: 12px 0; font-family: monospace; font-weight: bold;">${booking.id}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-weight: bold; color: #64748b;">Họ và tên:</td>
            <td style="padding: 12px 0; font-weight: bold;">${booking.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-weight: bold; color: #64748b;">Số điện thoại:</td>
            <td style="padding: 12px 0;">
              <a href="tel:${booking.phone}" style="color: #0070c0; text-decoration: none; font-weight: bold; font-size: 16px;">${booking.phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-weight: bold; color: #64748b;">Quận/Huyện:</td>
            <td style="padding: 12px 0;">${booking.district}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-weight: bold; color: #64748b;">Yêu cầu / Sự cố:</td>
            <td style="padding: 12px 0; color: #f37021; font-weight: bold;">${symptomName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: bold; color: #64748b;">Thời gian:</td>
            <td style="padding: 12px 0;">${booking.createdAt}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="tel:${booking.phone}" style="background-color: #f37021; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px rgba(243, 112, 33, 0.25);">
            📞 GỌI CHO KHÁCH NGAY
          </a>
        </div>
      </div>
      <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
        Hệ thống thông báo tự động từ Sửa Máy Lọc Nước 24H
      </div>
    </div>
  `;

  // Construct RFC 2822 raw message
  const rfcMessage = [
    `To: ${toEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    emailHtml
  ].join('\r\n');

  const encodedMessage = btoa(unescape(encodeURIComponent(rfcMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedMessage
    })
  });

  if (!res.ok) {
    throw new Error(`Failed to send email: ${await res.text()}`);
  }
};
