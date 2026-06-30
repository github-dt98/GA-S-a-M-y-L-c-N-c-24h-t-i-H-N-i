import { Symptom, PriceItem, FAQItem, Branch } from './types';

export const BRANDS = [
  'Karofi',
  'Kangaroo',
  'Sunhouse',
  'AO Smith',
  'Mutosi',
  'Hoà Phát'
];

export const DISTRICTS = [
  'Cầu Giấy',
  'Thanh Xuân',
  'Đống Đa',
  'Hà Đông',
  'Hoàng Mai',
  'Ba Đình',
  'Hai Bà Trưng',
  'Tây Hồ',
  'Hoàn Kiếm',
  'Long Biên',
  'Nam Từ Liêm',
  'Bắc Từ Liêm'
];

export const CONDOS = [
  'Vinhomes Royal, Times City',
  'KĐT HH Linh Đàm',
  'Goldmark City 136 Hồ Tùng Mậu',
  'Eco Green City Nguyễn Xiển',
  'Imperia Garden Nguyễn Tuân',
  'Hapulico Vũ Trọng Phụng'
];

export const SYMPTOMS: Symptom[] = [
  {
    id: 'ro-nuoc',
    title: 'Bị rò rỉ nước ra ngoài, ướt gầm tủ sàn nhà',
    shortDescription: 'Cốc lọc bị nứt vỡ do áp lực nước chung cư cao tầng quá lớn hoặc đứt ống dẫn, gioăng cao su trong van xả bị lệch và xì dịch.',
    detailedAnalysis: 'Hiện tượng rò rỉ nước thường do cốc lọc bị nứt vỡ, gioăng cao su bị lệch/lão hóa sau thời gian dài sử dụng, hoặc các mối nối dây dẫn nhanh bị lỏng dưới áp lực nước cao (đặc biệt tại các căn hộ chung cư).',
    recommendedFix: 'Kiểm tra kỹ hệ thống gioăng cao su, siết chặt lại các cốc lọc bằng vam chuyên dụng, thay thế đầu nối nhanh hoặc cốc lọc mới nếu phát hiện nứt vỡ.',
    estimatedPrice: '120.000đ - 180.000đ',
    severity: 'high',
    icon: 'Droplets',
    badgeText: 'Nguy cơ hỏng sàn gỗ',
    actionText: 'Sửa ngay'
  },
  {
    id: 'keu-tach-tach',
    title: 'Máy hoạt động kêu tạch tạch liên tục',
    shortDescription: 'Đường cấp nước bị yếu, lõi lọc thô bẩn nghẹt hoặc rơ le áp thấp ngắt mở liên tục tạo ra tiếng gõ búa đập mạnh làm ồn.',
    detailedAnalysis: 'Đường cấp nước đầu vào bị yếu hoặc lõi số 1, 2, 3 quá bẩn bị tắc khiến lượng nước không đủ nuôi bơm. Rơ-le áp thấp sẽ liên tục đóng ngắt để bảo vệ bơm, tạo ra tiếng kêu tạch tạch ngắt quãng liên tục.',
    recommendedFix: 'Thay thế bộ 3 lõi lọc thô định kỳ, kiểm tra áp lực nước nguồn đầu vào, điều chỉnh rơ-le áp thấp hoặc sửa chữa bơm nếu áp lực nén suy giảm.',
    estimatedPrice: '240.000đ - 350.000đ',
    severity: 'medium',
    icon: 'Volume2',
    badgeText: 'Cần khắc phục sớm',
    actionText: 'Sửa ngay'
  },
  {
    id: 'nuoc-yeu',
    title: 'Nước ăn vòi chảy cực yếu hoặc không có nước sạch',
    shortDescription: 'Hiện tượng phổ biến do màng RO bị tắc bẩn, van cao áp hỏng khiến máy xả hết nước thải hoặc bình áp tích nước bị mất hơi.',
    detailedAnalysis: 'Đây là lỗi phổ biến nhất. Màng lọc RO (lõi số 4 - trái tim của máy) bị tắc bẩn hoàn toàn khiến nước sạch không thể đi qua để nạp xuống bình áp dự trữ. Hoặc bình áp bị xì hơi, mất áp lực để đẩy nước lên vòi.',
    recommendedFix: 'Tiến hành đo áp lực nén của bơm cao áp (phải đạt từ 6-8kg/cm2), đo chỉ số tinh khiết nước (TDS), sục rửa hoặc thay màng RO chính hãng mới, nạp lại hơi bình áp.',
    estimatedPrice: '550.000đ',
    isPopular: true,
    severity: 'high',
    icon: 'Framer',
    badgeText: 'Ưu tiên xử lý nhanh',
    actionText: 'Sửa ngay'
  },
  {
    id: 'thai-nhieu',
    title: 'Nước thải chảy ra quá nhiều, máy chạy không ngừng',
    shortDescription: 'Máy hoạt động liên tục không tự ngắt khiến nước thải trào ra ngày đêm. Do hỏng van một chiều, van từ tính bị tắc hở.',
    detailedAnalysis: 'Khi bình áp đã đầy nước nhưng rơ-le áp cao bị hỏng không ngắt điện, hoặc van một chiều bị hở khiến nước sạch chảy ngược lại đường nước thải. Van từ tính hỏng/hở cũng làm nước thải chảy liên tục ngay cả khi máy ngừng hoạt động.',
    recommendedFix: 'Thay thế van một chiều mới, kiểm tra và thay thế van điện từ hoặc rơ-le áp cao để đảm bảo máy tự ngắt chính xác khi đầy bình.',
    estimatedPrice: '120.000đ - 130.000đ',
    severity: 'medium',
    icon: 'Trash2',
    badgeText: 'Tốn chi phí tiền nước',
    actionText: 'Sửa ngay'
  },
  {
    id: 'mat-nguon',
    title: 'Mất nguồn hoàn toàn, máy im lìm không chạy',
    shortDescription: 'Có thể cháy cục đổi nguồn Adapter 24V, đứt dây ngầm do chuột cắn hoặc chập hệ thống rơ le cảm biến áp lực cao.',
    detailedAnalysis: 'Hệ thống điện của máy lọc nước sử dụng nguồn 24V qua bộ Adapter chuyển đổi từ 220V. Adapter có thể bị cháy chập cuộn dây, hoặc dây dẫn bị đứt ngầm do côn trùng, chuột cắn phá. Rơ-le áp cao/áp thấp bị hỏng mạch cũng ngắt dòng điện vào bơm.',
    recommendedFix: 'Sử dụng đồng hồ đo vạn năng đo nguồn ra của Adapter, kiểm tra thông mạch dây dẫn, thay thế Adapter chính hãng 24V chống quá tải hoặc rơ-le hỏng.',
    estimatedPrice: '240.000đ - 350.000đ',
    severity: 'high',
    icon: 'ZapOff',
    badgeText: 'Nguy cơ mất an toàn điện',
    actionText: 'Sửa ngay'
  },
  {
    id: 'vi-la',
    title: 'Cần bảo dưỡng toàn diện & thay lõi lọc định kỳ',
    shortDescription: 'Các lõi bù khoáng, hoạt tính carbon chức năng đã quá chu kỳ lọc (12-18 tháng), làm giảm vị tinh khiết của nước.',
    detailedAnalysis: 'Các lõi chức năng từ số 5 đến số 9 (T33, Maifan, Alkaline, Nano Silver) có tuổi thọ từ 12 - 18 tháng. Khi hết hạn, vật liệu lọc không còn khả năng bù khoáng, kháng khuẩn hay tạo vị ngọt tự nhiên, khiến nước có vị nhạt, hôi hoặc vẩn đục nhẹ.',
    recommendedFix: 'Đo chất lượng nước đầu ra bằng bút thử TDS, tiến hành thay thế các lõi lọc bù khoáng, nâng cấp bộ lõi tạo khoáng chất lượng cao để khôi phục vị ngon ngọt tự nhiên của nước.',
    estimatedPrice: 'từ 750.000đ (bộ 4 lõi)',
    severity: 'low',
    icon: 'Activity',
    badgeText: 'Ảnh hưởng sức khỏe',
    actionText: 'Thay lõi ngay'
  }
];

export const PRICE_ITEMS: PriceItem[] = [
  {
    id: 'loi-123',
    name: 'Bộ 3 Lõi Lọc Thô Số 1, 2, 3',
    description: 'Khuyên dùng thay thế định kỳ 3-6 tháng giúp bảo vệ màng RO',
    price: '250.000đ',
    unit: 'bộ 3 lõi',
    category: 'filter',
    isPopular: false
  },
  {
    id: 'mang-ro',
    name: 'Màng RO Chính Hãng (Lõi 4 - 75 GPD)',
    description: 'Trái tim của máy lọc, lọc sạch kim loại nặng, vi khuẩn, hóa chất độc hại',
    price: '550.000đ',
    unit: 'chiếc',
    category: 'membrane',
    isPopular: true
  },
  {
    id: 'loi-chuc-nang',
    name: 'Bộ 4 Lõi Lọc Chức Năng (5, 6, 7, 8)',
    description: 'Bù khoáng chất, tạo vị ngọt mát tự nhiên, bổ sung chất điện giải dồi dào',
    price: '750.000đ',
    unit: 'bộ',
    category: 'functional',
    isPopular: false
  },
  {
    id: 'bom-24v',
    name: 'Bơm Áp Lực Cao 24V chuyên dụng',
    description: 'Vận hành êm ái không tiếng ồn, lực hút và đẩy cực mạnh bền bỉ',
    price: '725.000đ',
    unit: 'chiếc',
    category: 'pump',
    isPopular: false
  },
  {
    id: 'adapter-24v',
    name: 'Bộ Đổi Nguồn Adapter 24V',
    description: 'Nguồn ổn áp chính hãng, tản nhiệt tốt, chống cháy chập, chống quá tải',
    price: '240.000đ',
    unit: 'chiếc',
    category: 'power',
    isPopular: false
  },
  {
    id: 'binh-ap-3.2g',
    name: 'Bình Áp Tích Nước Cao Cấp (3.2 Gallon)',
    description: 'Chất liệu thép bọc nhựa ABS cao cấp, an toàn vệ sinh thực phẩm, siêu bền',
    price: '552.000đ',
    unit: 'chiếc',
    category: 'tank',
    isPopular: false
  },
  {
    id: 'van-ro-le',
    name: 'Van Điện Từ / Rơ le Áp Cao - Áp Thấp',
    description: 'Tự động đóng ngắt nguồn nước cấp & ngắt điện an toàn khi đầy bình',
    price: '120.000đ - 130.000đ',
    unit: 'chiếc',
    category: 'valve',
    isPopular: false
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Chi phí kiểm tra máy tại nhà nếu tôi không sửa là bao nhiêu?',
    answer: 'Hoàn toàn MIỄN PHÍ. Kỹ thuật viên của chúng tôi sẽ đến tận nhà, đo chỉ số nước đầu vào/đầu ra bằng bút thử TDS chuyên dụng, kiểm tra chi tiết các linh kiện, xác định chính xác nguyên nhân gây lỗi và thông báo chi phí thay thế. Nếu quý khách không đồng ý sửa chữa, kỹ thuật viên sẽ vui vẻ ra về và không thu bất kỳ khoản chi phí nào.'
  },
  {
    id: 'faq-2',
    question: 'Gọi điện thì sau bao lâu kỹ thuật viên có mặt tại nhà?',
    answer: 'Chúng tôi luôn có đội ngũ kỹ thuật viên lành nghề túc trực tại tất cả các văn phòng cơ sở trên 12 quận huyện Hà Nội. Thông thường thời gian có mặt chỉ từ 15 - 30 phút sau khi tiếp nhận yêu cầu. Đối với các khung giờ cao điểm hoặc địa bàn xa trung tâm, chúng tôi sẽ chủ động thông báo trước và hẹn lịch cụ thể phù hợp nhất với quý khách.'
  },
  {
    id: 'faq-3',
    question: 'Linh kiện được thay thế bảo hành trong thời gian bao lâu?',
    answer: 'Toàn bộ linh kiện phần điện thay thế (bơm áp lực, bộ nguồn Adapter, van điện từ, bình tích áp...) đều được bảo hành bằng tem chính hãng dán trực tiếp trên thiết bị từ 6 đến 24 tháng theo quy định của nhà sản xuất. Đối với lõi lọc tiêu hao, chúng tôi có phần mềm lưu thông tin khách hàng để chủ động nhắn tin nhắc lịch thay lõi khi đến hạn.'
  },
  {
    id: 'faq-4',
    question: 'Trung tâm có làm việc vào ngày chủ nhật hay lễ tết không?',
    answer: 'Có. Để phục vụ tốt nhất cho các gia đình bận rộn trong tuần, trung tâm hoạt động liên tục 24/7 kể cả ngày thứ Bảy, Chủ Nhật và các ngày nghỉ lễ lớn. Mọi chi phí dịch vụ và giá linh kiện đều giữ nguyên niêm yết công khai, cam kết không tăng giá ngoài giờ hay dịp lễ tết.'
  }
];

export const BRANCHES: Branch[] = [
  { id: 'cs1', name: 'Cầu Giấy – Cơ sở 1', address: 'Số 68 Xuân Thủy, Q. Cầu Giấy, Hà Nội' },
  { id: 'cs2', name: 'Cầu Giấy – Cơ sở 2', address: 'Số 12 Trần Duy Hưng, Q. Cầu Giấy, Hà Nội' },
  { id: 'cs3', name: 'Cầu Giấy – Cơ sở 3', address: 'Số 105 Nguyễn Phong Sắc, Q. Cầu Giấy, Hà Nội' },
  { id: 'cs4', name: 'Đống Đa – Cơ sở 1', address: 'Số 198 Tây Sơn, Q. Đống Đa, Hà Nội' },
  { id: 'cs5', name: 'Đống Đa – Cơ sở 2', address: 'Số 45 Chùa Bộc, Q. Đống Đa, Hà Nội' },
  { id: 'cs6', name: 'Đống Đa – Cơ sở 3', address: 'Số 88 Láng Hạ, Q. Đống Đa, Hà Nội' },
  { id: 'cs7', name: 'Thanh Xuân – Cơ sở 1', address: 'Số 234 Nguyễn Trãi, Q. Thanh Xuân, Hà Nội' },
  { id: 'cs8', name: 'Thanh Xuân – Cơ sở 2', address: 'Số 85 Lê Văn Lương, Q. Thanh Xuân, Hà Nội' },
  { id: 'cs9', name: 'Hà Đông – Cơ sở 1', address: 'Số 10 Trần Phú, Q. Hà Đông, Hà Nội' },
  { id: 'cs10', name: 'Hà Đông – Cơ sở 2', address: 'Khu đô thị Văn Quán, Q. Hà Đông, Hà Nội' },
  { id: 'cs11', name: 'Hà Đông – Cơ sở 3', address: 'Số 56 Quang Trung, Q. Hà Đông, Hà Nội' },
  { id: 'cs12', name: 'Ba Đình – Cơ sở 1', address: 'Số 120 Đội Cấn, Q. Ba Đình, Hà Nội' },
  { id: 'cs13', name: 'Ba Đình – Cơ sở 2', address: 'Số 75 Kim Mã, Q. Ba Đình, Hà Nội' },
  { id: 'cs14', name: 'Hai Bà Trưng – CS 1', address: 'Số 321 Minh Khai, Q. Hai Bà Trưng, Hà Nội' },
  { id: 'cs15', name: 'Hai Bà Trưng – CS 2', address: 'Số 92 Phố Huế, Q. Hai Bà Trưng, Hà Nội' },
  { id: 'cs16', name: 'Hoàng Mai – Cơ sở 1', address: 'Khu đô thị Linh Đàm, Q. Hoàng Mai, Hà Nội' },
  { id: 'cs17', name: 'Hoàng Mai – Cơ sở 2', address: 'Số 415 Giải Phóng, Q. Hoàng Mai, Hà Nội' },
  { id: 'cs18', name: 'Nam Từ Liêm – CS 1', address: 'Số 18 Nguyễn Cơ Thạch, Q. Nam Từ Liêm, Hà Nội' },
  { id: 'cs19', name: 'Nam Từ Liêm – CS 2', address: 'Số 52 Mỹ Đình, Q. Nam Từ Liêm, Hà Nội' }
];

export const REVIEWS = [
  {
    stars: 5,
    text: '"Máy lọc nước Karofi nhà mình bị tràn nước sau khi thợ thay lõi ở bên khác làm không cẩn thận. Gọi bên này chỉ 20 phút sau thợ đã có mặt xử lý dứt điểm. Thợ rất chuyên nghiệp, còn giúp mình lau sạch sàn gỗ bị ướt. Rất uy tín!"',
    author: 'Chị Thu Hường',
    location: 'Chung cư HH Linh Đàm, Hoàng Mai',
    initials: 'CH',
    bgColor: 'bg-blue-100 text-blue-600'
  },
  {
    stars: 5,
    text: '"Lúc đầu định tự mua lõi về tự thay nhưng tháo ra bị rò rỉ nước làm tôm tụm cả sàn. May gọi thợ của trung tâm đến cứu kịp lúc không thì hỏng sàn gỗ. Thợ xử lý nhanh, lắp các cốc chắc chắn, dọn dẹp sạch sẽ mới về. Đánh giá 5 sao về chất lượng phục vụ."',
    author: 'Anh Minh Tuấn',
    location: 'Ngõ 105 Hồ Tùng Mậu, Cầu Giấy',
    initials: 'AT',
    bgColor: 'bg-emerald-100 text-emerald-600'
  },
  {
    stars: 5,
    text: '"Nhà tôi dùng máy Kangaroo khá lâu nên nước ăn chảy ra rất nhỏ. Kỹ thuật viên đến đo chỉ số nước và bảo dưỡng thay màng RO chính hãng. Giờ nước chảy căng khỏe, vị ngọt tinh khiết như lúc mới mua. Chế độ bảo hành dài 12 tháng dán tem rõ ràng."',
    author: 'Cô Ngọc Minh',
    location: 'Phố Nguyễn Trãi, Thanh Xuân',
    initials: 'NM',
    bgColor: 'bg-orange-100 text-orange-600'
  }
];
