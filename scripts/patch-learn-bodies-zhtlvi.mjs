/**
 * Localize full sections for money learn posts in zh, vi, tl from curated translations.
 * Run: node scripts/patch-learn-bodies-zhtlvi.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/lib/learn-i18n");

/** @type {Record<string, Record<string, { title: string, description: string, sections: {heading:string,body:string}[] }>>} */
const BODIES = {
  zh: {
    "which-civics-test": {
      title: "我该考哪套公民测验？2008、2025 还是 65/20",
      description:
        "先选对 USCIS 题库再学习——N-400 递交日期（2008 vs 2025）、65/20 老年路径、免费资格检查、音频与面试模拟。无需注册。",
      sections: [
        {
          heading: "从这里开始——不要猜题库",
          body: "学错清单是最昂贵的错误。N-400 递交日期决定 2008（100 题）还是 2025（128 题）。年满 65 且永久居民满 20 年可能适用 65/20 星标题。先确认再刷闪卡。",
        },
        {
          heading: "路径 A——N-400 递交日期（多数申请人）",
          body: "2025 年 10 月 20 日之前递交 → 2008 测验（最多问 10 题，需答对 6 题）。当日或之后 → 2025 测验（最多 20 题，需 12 题）。使用 N-400 指南后练习对应题库，含音频与模拟。",
        },
        {
          heading: "路径 B——65/20 特别考量",
          body: "若年满 65 且合法永久居民满 20 年，USCIS 可能从更小的星标题库提问（最多 10 题需 6 题正确）。可能适用自选语言。见 65/20 指南与老年练习列表。",
        },
        {
          heading: "60 秒检查，然后练习",
          body: "运行「查找我的测验版本」（免费、无需账户）。打开 2008 或 2025 练习——或老年模式——几秒即可开始。若无豁免，请搭配英语读写。",
        },
      ],
    },
    "n-400-filing-date": {
      title: "N-400 递交日期：考 2008 还是 2025？",
      description:
        "N-400 递交日期决定 2008（100）还是 2025（128）。免费·无需注册·几秒开始——资格检查 + 官方题库练习，含音频与面试模拟。",
      sections: [
        {
          heading: "2025 年 10 月 20 日分界",
          body: "在该日之前递交 N-400 的申请人通常考 2008 公民测验（100 题库，问至多 10 题，需 6 题正确）。当日或之后递交通常考 2025（128 题，问至多 20 题，需 12 题）。请以 USCIS 现行规则核实你的个案。",
        },
        {
          heading: "递交日期优先于「今天的日期」",
          body: "很多人默认学最新的 128 题。若收据日期属于 2008，应练习 100 题库与 6/10 及格规则——否则学错套题。",
        },
        {
          heading: "如何核对并练习",
          body: "找到递交证明，运行免费资格流程，然后打开全部 100 或 128 题。仅在适用时再加 65/20 老年练习。",
        },
        {
          heading: "面试模拟匹配版本",
          body: "按 2008 或 2025 练习，使提前停止的及格/不及格规则与面试一致。若无豁免，请搭配英语读写。",
        },
        {
          heading: "材料不清时",
          body: "本站无法查询 USCIS 案件状态。向律师或认可代表确认适用版本，然后在此免费练习该题库。",
        },
      ],
    },
    "65-20": {
      title: "65/20 特别考量：更少星标题",
      description:
        "年满 65 且永久居民满 20 年？了解 65/20 路径、星标题列表，以及免费音频与模拟练习——无需注册，几秒开始。",
      sections: [
        {
          heading: "谁可能符合",
          body: "年满 65 且作为合法永久居民满 20 年或以上的申请人，可能获得特别考量：官员从选定的 20 道星标题中提问（通常最多 10 题，需 6 题正确）。规则可能更新——以 USCIS 为准。",
        },
        {
          heading: "仍须确认测验版本",
          body: "65/20 不取消 N-400 递交日期逻辑。你仍可能对应 2008 或 2025 星标集。先做资格检查。",
        },
        {
          heading: "如何练习",
          body: "打开老年/星标列表，用老年模式练习 2008 或 2025。大声跟读；真实测验是口试。",
        },
        {
          heading: "语言选择",
          body: "符合条件时，公民测验可能可用自选语言进行。英语豁免规则单独适用——详见 USCIS。",
        },
      ],
    },
    "fail-citizenship-test": {
      title: "公民测验或英语未通过会怎样？",
      description:
        "面试英语或公民题未过？接下来通常怎样、如何选对题库（2008/2025/65/20），以及免费音频与模拟重考练习——无需注册。",
      sections: [
        {
          heading: "通常还有一次机会",
          body: "若英语或公民部分未通过，USCIS 一般会再给一次机会考未通过部分。具体时间按你个案的现行政策——本站不是法律意见。",
        },
        {
          heading: "重考前先确认题库",
          body: "学错清单会导致重考准备失败。先核对 N-400 递交日期（2008 vs 2025）或 65/20 资格，再只练习该题库。",
        },
        {
          heading: "善用等待时间",
          body: "每天短时练习胜过考前突击。聚焦未过部分：公民、阅读、写作或口语。免费练习几秒即可开始——无需账户。",
        },
        {
          heading: "公民重考准备",
          body: "专攻薄弱题与会变更的官员题。跑面试模拟直到稳定超过 6/10 或 12/20。用英语听题。",
        },
        {
          heading: "英语重考准备",
          body: "用官方读写词汇与音频练习。口语上清楚回答申请相关问题。搭配本站英语练习页。",
        },
      ],
    },
    "30-day-study-plan": {
      title: "美国公民测验 30 天学习计划",
      description:
        "先确认正确题库（递交日或 65/20），再每日练习、口语与模拟周——免费、无需注册、10+ 语言。",
      sections: [
        {
          heading: "第 1–2 天：确认版本",
          body: "使用「查找我的测验版本」或 which-test 指南。N-400 递交日决定 2008（100 题）或 2025（128 题）。题库错了整月都白费。",
        },
        {
          heading: "第 3–14 天：覆盖题库",
          body: "每天 15–25 分钟闪卡与主题练习。标记薄弱项。即使用其他语言学习，也要用英语听题——面试公民题通常用英语（除非适用例外）。",
        },
        {
          heading: "第 15–24 天：补弱 + 会变答案",
          body: "用智能复习。用邮编核对总统、参议员、众议员、州长与首府。日期与人名易错则专项练习。",
        },
        {
          heading: "第 25–30 天：模拟面试周",
          body: "每天完整模拟直到稳定及格（6/10 或 12/20）。加上英语读写。约见前睡好。",
        },
      ],
    },
    "reading-writing-tips": {
      title: "USCIS 英语读写测验 — 免费练习要点",
      description:
        "归化英语读写如何考、官方词汇练习，以及免费听写句子——并与正确公民题库搭配。无需注册。",
      sections: [
        {
          heading: "你需要展示什么",
          body: "除非豁免，你须展示基础英语：面试口语、正确读出一句、正确写出一句（尝试次数有限）。",
        },
        {
          heading: "紧盯官方词汇",
          body: "读写使用 USCIS 词汇表。随机英语 App 不如用这些词组成的句子——人物、公民词、地点、节日与常用动词。",
        },
        {
          heading: "练习方法",
          body: "听句子、朗读、听写。检查拼写。错过的句子次日再练。",
        },
        {
          heading: "与公民同天——先对题库",
          body: "2025 公民更新未改读写，但公民题库仍取决于 N-400 或 65/20。先确认公民版本，再在此免费练英语。",
        },
        {
          heading: "在此免费练习",
          body: "打开英语读写页。结合公民 speak 模式与面试模拟——几秒开始，无需账户。",
        },
      ],
    },
  },
  vi: {
    "which-civics-test": {
      title: "Tôi thi bộ câu hỏi công dân nào? 2008, 2025 hay 65/20",
      description:
        "Một trang để chọn đúng ngân hàng USCIS trước khi học — ngày nộp N-400 (2008 vs 2025), lộ trình 65/20, kiểm tra đủ điều kiện miễn phí, audio và mô phỏng phỏng vấn. Không cần đăng ký.",
      sections: [
        {
          heading: "Bắt đầu đây — đừng đoán ngân hàng",
          body: "Học sai danh sách là lỗi đắt nhất. Ngày nộp N-400 quyết định 2008 (100 câu) hay 2025 (128 câu). Từ 65 tuổi và thường trú 20 năm có thể đủ điều kiện 65/20. Xác nhận trước khi dùng flashcards.",
        },
        {
          heading: "Lộ trình A — ngày nộp N-400 (đa số)",
          body: "Nộp trước 20/10/2025 → bài 2008 (tối đa 10 câu, cần 6 đúng). Ngày đó trở đi → 2025 (tối đa 20, cần 12). Dùng hướng dẫn N-400 rồi luyện đúng ngân hàng với audio và mô phỏng.",
        },
        {
          heading: "Lộ trình B — xét đặc biệt 65/20",
          body: "Nếu từ 65 tuổi và thường trú hợp pháp từ 20 năm, USCIS có thể hỏi từ ngân hàng gắn sao nhỏ hơn (cần 6/10). Có thể dùng ngôn ngữ tự chọn. Xem hướng dẫn 65/20 và danh sách luyện senior.",
        },
        {
          heading: "Kiểm tra 60 giây rồi luyện",
          body: "Chạy Tìm phiên bản của tôi (miễn phí, không tài khoản). Mở luyện 2008 hoặc 2025 — hoặc chế độ senior — bắt đầu trong vài giây. Kết hợp đọc/viết tiếng Anh nếu không được miễn.",
        },
      ],
    },
    "n-400-filing-date": {
      title: "Ngày nộp N-400: thi 2008 hay 2025?",
      description:
        "Ngày nộp N-400 quyết định 2008 (100) hay 2025 (128). Miễn phí · không đăng ký · bắt đầu trong giây — kiểm tra đủ điều kiện + luyện ngân hàng chính thức với audio và mô phỏng.",
      sections: [
        {
          heading: "Mốc 20 tháng 10 năm 2025",
          body: "Nộp N-400 trước ngày đó thường thi civics 2008 (100 câu, hỏi tối đa 10, cần 6 đúng). Nộp trong hoặc sau ngày đó thường thi 2025 (128 câu, hỏi tối đa 20, cần 12). Luôn đối chiếu quy tắc USCIS hiện hành.",
        },
        {
          heading: "Ngày nộp quan trọng hơn “hôm nay”",
          body: "Nhiều người mặc định học 128 câu mới. Nếu ngày biên nhận thuộc 2008, hãy luyện 100 câu và quy tắc 6/10 — nếu không sẽ học sai bộ.",
        },
        {
          heading: "Cách kiểm tra và luyện",
          body: "Tìm bằng chứng nộp đơn, chạy luồng đủ điều kiện miễn phí, rồi mở all-100 hoặc all-128. Chỉ thêm luyện 65/20 nếu áp dụng.",
        },
        {
          heading: "Mô phỏng khớp phiên bản",
          body: "Luyện 2008 hoặc 2025 để quy tắc dừng sớm khớp buổi phỏng vấn. Kết hợp đọc/viết tiếng Anh nếu không miễn.",
        },
        {
          heading: "Khi giấy tờ chưa rõ",
          body: "Trang này không kiểm tra trạng thái hồ sơ USCIS. Hỏi luật sư hoặc đại diện được công nhận phiên bản nào áp dụng, rồi luyện miễn phí ngân hàng đó tại đây.",
        },
      ],
    },
    "65-20": {
      title: "Xét đặc biệt 65/20: ít câu gắn sao hơn",
      description:
        "Từ 65 tuổi và thường trú 20 năm? Hiểu lộ trình 65/20, danh sách gắn sao, và luyện miễn phí với audio/mô phỏng — không đăng ký, bắt đầu trong giây.",
      sections: [
        {
          heading: "Ai có thể đủ điều kiện",
          body: "Ứng viên từ 65 tuổi và thường trú hợp pháp từ 20 năm có thể được xét đặc biệt: viên chức hỏi từ 20 câu gắn sao (thường tối đa 10, cần 6 đúng). Quy tắc có thể đổi — theo USCIS.",
        },
        {
          heading: "Vẫn phải xác nhận phiên bản",
          body: "65/20 không hủy logic ngày nộp N-400. Bạn vẫn có thể thuộc bộ gắn sao 2008 hoặc 2025. Chạy kiểm tra đủ điều kiện trước.",
        },
        {
          heading: "Cách luyện",
          body: "Mở danh sách senior/starred và luyện chế độ senior cho 2008 hoặc 2025. Nói to đáp án; bài thi thật là miệng.",
        },
        {
          heading: "Ngôn ngữ tự chọn",
          body: "Khi đủ điều kiện, phần civics có thể bằng ngôn ngữ bạn chọn. Miễn tiếng Anh là quy tắc riêng — xem USCIS.",
        },
      ],
    },
    "fail-citizenship-test": {
      title: "Trượt phần công dân hoặc tiếng Anh thì sao?",
      description:
        "Trượt tiếng Anh hoặc civics khi phỏng vấn? Thường xảy ra gì tiếp, cách chọn đúng ngân hàng (2008/2025/65/20) và luyện thi lại miễn phí với audio/mô phỏng — không đăng ký.",
      sections: [
        {
          heading: "Thường còn một lần nữa",
          body: "Nếu trượt tiếng Anh hoặc civics, USCIS thường cho thêm cơ hội thi phần đã trượt. Thời gian theo chính sách hiện hành của hồ sơ bạn — đây không phải tư vấn pháp lý.",
        },
        {
          heading: "Xác nhận ngân hàng trước khi luyện lại",
          body: "Chuẩn bị thi lại thất bại nếu học sai danh sách. Kiểm tra ngày nộp N-400 (2008 vs 2025) hoặc đủ điều kiện 65/20 trước, rồi chỉ luyện ngân hàng đó.",
        },
        {
          heading: "Dùng thời gian chờ khôn ngoan",
          body: "Buổi ngắn mỗi ngày hơn học dồn. Tập trung phần đã trượt. Bắt đầu luyện miễn phí trong vài giây — không cần tài khoản.",
        },
        {
          heading: "Chuẩn bị thi lại civics",
          body: "Luyện câu yếu và quan chức thay đổi. Chạy mô phỏng đến khi vượt 6/10 hoặc 12/20. Nghe câu hỏi bằng tiếng Anh.",
        },
        {
          heading: "Chuẩn bị thi lại tiếng Anh",
          body: "Dùng từ vựng đọc/viết chính thức kèm audio. Phần nói: trả lời rõ ràng về đơn. Kết hợp trang luyện tiếng Anh của chúng tôi.",
        },
      ],
    },
    "30-day-study-plan": {
      title: "Kế hoạch học 30 ngày cho bài thi công dân Mỹ",
      description:
        "Kế hoạch 30 ngày bắt đầu bằng đúng ngân hàng (ngày nộp hoặc 65/20), rồi luyện hàng ngày và tuần mô phỏng — miễn phí, không đăng ký, 10+ ngôn ngữ.",
      sections: [
        {
          heading: "Ngày 1–2: Xác nhận phiên bản",
          body: "Dùng Tìm phiên bản của tôi hoặc hướng dẫn which-test. Ngày nộp N-400 quyết định 2008 (100) vs 2025 (128). Sai ngân hàng là phí cả tháng.",
        },
        {
          heading: "Ngày 3–14: Bao phủ ngân hàng",
          body: "15–25 phút mỗi ngày với flashcards và chủ đề. Đánh dấu chỗ yếu. Nghe câu tiếng Anh dù học thêm ngôn ngữ khác.",
        },
        {
          heading: "Ngày 15–24: Chữa yếu + câu đổi",
          body: "Dùng ôn thông minh. Kiểm lại Tổng thống, thượng nghị sĩ, dân biểu, thống đốc và thủ phủ bằng ZIP. Luyện ngày tháng/tên nếu hay sai.",
        },
        {
          heading: "Ngày 25–30: Tuần mô phỏng",
          body: "Mô phỏng đầy đủ mỗi ngày đến khi đậu ổn định (6/10 hoặc 12/20). Thêm đọc/viết. Ngủ đủ trước buổi hẹn.",
        },
      ],
    },
    "reading-writing-tips": {
      title: "Thi đọc-viết tiếng Anh USCIS — mẹo luyện miễn phí",
      description:
        "Cách hoạt động của reading/writing khi nhập tịch, luyện từ vựng chính thức và câu miễn phí có audio — kèm đúng ngân hàng civics. Không đăng ký.",
      sections: [
        {
          heading: "Bạn cần thể hiện gì",
          body: "Trừ khi được miễn, bạn phải thể hiện tiếng Anh cơ bản: nói trong phỏng vấn, đọc đúng một câu và viết đúng một câu (số lần thử có hạn).",
        },
        {
          heading: "Bám từ vựng chính thức",
          body: "Đọc/viết dùng danh sách từ USCIS. App tiếng Anh ngẫu nhiên kém hơn câu dựng từ những từ đó.",
        },
        {
          heading: "Cách luyện",
          body: "Nghe câu, đọc to, viết chính tả. Kiểm lỗi. Lặp lại câu sai vào hôm sau.",
        },
        {
          heading: "Cùng ngày với civics — đúng ngân hàng trước",
          body: "Đọc/viết không đổi với bản cập nhật civics 2025, nhưng ngân hàng civics vẫn phụ thuộc N-400 hoặc 65/20. Xác nhận phiên bản rồi luyện tiếng Anh miễn phí tại đây.",
        },
        {
          heading: "Luyện miễn phí tại đây",
          body: "Mở trang đọc/viết tiếng Anh. Kết hợp speak mode và mô phỏng — bắt đầu trong vài giây, không tài khoản.",
        },
      ],
    },
  },
  tl: {
    "which-civics-test": {
      title: "Aling civics test ang kukunin ko? 2008, 2025, o 65/20",
      description:
        "Isang page para piliin ang tamang USCIS bank bago mag-aral — N-400 filing date (2008 vs 2025), 65/20 path, libreng eligibility, audio, at interview simulation. Walang sign-up.",
      sections: [
        {
          heading: "Magsimula dito — huwag hulaan ang bank",
          body: "Ang maling listahan ang pinakamahal na pagkakamali. Ang N-400 filing date ang nagdedesisyon ng 2008 (100 Q) vs 2025 (128 Q). Ang 65+ na may 20 taon bilang permanent resident ay maaaring 65/20. Kumpirmahin bago ang flashcards.",
        },
        {
          heading: "Path A — N-400 filing date (karamihan)",
          body: "Nag-file bago ang Oktubre 20, 2025 → 2008 test (hanggang 10 tanong, kailangan 6). Sa araw na iyon o pagkatapos → 2025 (hanggang 20, kailangan 12). Gamitin ang N-400 guide, tapos practice ang tamang bank na may audio at simulation.",
        },
        {
          heading: "Path B — 65/20 special consideration",
          body: "Kung 65+ at 20+ taon bilang LPR, maaaring magtanong ang USCIS mula sa mas maliit na starred bank (6 ng hanggang 10). Maaaring language of choice. Tingnan ang 65/20 guide at senior practice list.",
        },
        {
          heading: "60-segundong check, tapos practice",
          body: "Patakbuhin ang Find my test version (libre, walang account). Buksan ang practice 2008 o 2025 — o senior mode — at magsimula sa ilang segundo. Idagdag ang English reading/writing kung hindi exempt.",
        },
      ],
    },
    "n-400-filing-date": {
      title: "N-400 Filing Date: 2008 o 2025 civics test?",
      description:
        "Ang N-400 filing date ang nagdedesisyon ng 2008 (100) vs 2025 (128). Libre · walang sign-up · start in seconds — eligibility check plus official bank practice with audio at interview simulation.",
      sections: [
        {
          heading: "Ang Oktubre 20, 2025 cutoff",
          body: "Ang nag-file ng N-400 bago ang Oktubre 20, 2025 ay karaniwang kumukuha ng 2008 civics test (100 Q, hanggang 10 tanong, kailangan 6). Sa araw na iyon o pagkatapos — 2025 (128 Q, hanggang 20, kailangan 12). Palaging i-verify sa kasalukuyang USCIS rules.",
        },
        {
          heading: "Filing date bago ang “today’s date”",
          body: "Maraming default sa pinakabagong 128 list. Kung ang receipt date mo ay 2008, practice ang 100-question bank at 6-of-10 rule — o mali ang pinag-aaralan.",
        },
        {
          heading: "Paano mag-check at mag-practice",
          body: "Hanapin ang filing evidence, patakbuhin ang libreng eligibility flow, tapos buksan ang all-100 o all-128. Magdagdag ng 65/20 senior practice kung applicable.",
        },
        {
          heading: "Tumutugma ang interview simulation sa version",
          body: "Mag-practice para sa 2008 o 2025 para tumugma ang early-stop pass/fail rules. Idagdag ang English reading/writing kung hindi exempt.",
        },
        {
          heading: "Kapag hindi malinaw ang paperwork",
          body: "Hindi makakacheck ang site na ito ng USCIS case status. Tanungin ang attorney o accredited representative kung aling version ang applicable, tapos i-practice nang libre ang bank na iyon dito.",
        },
      ],
    },
    "65-20": {
      title: "65/20 special consideration: mas kaunting starred questions",
      description:
        "65+ at 20 taon bilang permanent resident? Unawain ang 65/20 path, starred list, at libreng practice na may audio at simulation — walang sign-up, start in seconds.",
      sections: [
        {
          heading: "Sino ang maaaring mag-qualify",
          body: "Ang mga 65+ na may 20+ taon bilang LPR ay maaaring makakuha ng special consideration: nagtatanong ang officer mula sa 20 starred questions (karaniwang hanggang 10, kailangan 6). Maaaring magbago ang rules — sundin ang USCIS.",
        },
        {
          heading: "Kumpirmahin pa rin ang test version",
          body: "Hindi kinakansela ng 65/20 ang N-400 filing-date logic. Maaari ka pa ring nasa 2008 o 2025 starred set. Patakbuhin muna ang eligibility check.",
        },
        {
          heading: "Paano mag-practice",
          body: "Buksan ang senior/starred list at mag-practice sa senior mode para sa 2008 o 2025. Sabihin nang malakas ang sagot; oral ang tunay na test.",
        },
        {
          heading: "Language of choice",
          body: "Kapag qualified, maaaring language of choice ang civics. Separado ang English exemption rules — tingnan ang USCIS.",
        },
      ],
    },
    "fail-citizenship-test": {
      title: "Ano ang mangyayari kung bagsak sa civics o English test?",
      description:
        "Bagsak sa English o civics sa interview? Ano ang sunod, paano piliin ang tamang bank (2008/2025/65/20), at libreng retest prep na may audio at simulation — walang sign-up.",
      sections: [
        {
          heading: "Karaniwang may isa pang pagkakataon",
          body: "Kung bagsak sa English o civics, karaniwang binibigyan ka ng USCIS ng isa pang chance sa bagsak na bahagi. Sundin ang current policy para sa case mo — hindi ito legal advice.",
        },
        {
          heading: "Kumpirmahin ang bank bago mag-restart",
          body: "Bigo ang retest prep kapag mali ang listahan. Check muna ang N-400 filing date (2008 vs 2025) o 65/20 eligibility, tapos i-practice lang ang bank na iyon.",
        },
        {
          heading: "Gamitin nang maayos ang wait",
          body: "Mas maganda ang maikling sessions araw-araw kaysa last-minute cram. Tumutok sa bagsak: civics, reading, writing, o speaking. Magsimula nang libre sa ilang segundo — walang account.",
        },
        {
          heading: "Civics retest prep",
          body: "I-drill ang mahihinang tanong at changing officials. Magpatakbo ng interview simulations hanggang malampasan ang 6/10 o 12/20. Pakinggan ang tanong sa English.",
        },
        {
          heading: "English retest prep",
          body: "Gamitin ang official reading/writing vocabulary with audio. Para sa speaking, sagutin nang malinaw ang application questions. Idagdag ang aming English practice pages.",
        },
      ],
    },
    "30-day-study-plan": {
      title: "30-araw na study plan para sa US civics test",
      description:
        "30-araw na plano na nagsisimula sa tamang bank (filing date o 65/20), tapos daily drills at simulation week — libre, walang sign-up, 10+ languages.",
      sections: [
        {
          heading: "Araw 1–2: Kumpirmahin ang version",
          body: "Gamitin ang Find my test version o which-test guide. Ang N-400 filing date ang nagdedesisyon ng 2008 (100) vs 2025 (128). Mali ang bank = sayang ang buong buwan.",
        },
        {
          heading: "Araw 3–14: Takpan ang bank",
          body: "15–25 minuto araw-araw na flashcards at topic drills. Markahan ang mahihina. Pakinggan ang English questions kahit mag-aral din sa ibang wika.",
        },
        {
          heading: "Araw 15–24: Ayusin ang mahihina + changing answers",
          body: "Gamitin ang smart review. I-recheck ang President, senators, representative, governor, at capital gamit ang ZIP. Mag-drill ng dates/names kung madalas magkamali.",
        },
        {
          heading: "Araw 25–30: Simulation week",
          body: "Full interview simulations araw-araw hanggang consistent na pumasa (6/10 o 12/20). Magdagdag ng English reading/writing. Matulog nang maayos bago ang appointment.",
        },
      ],
    },
    "reading-writing-tips": {
      title: "USCIS English reading at writing — libreng tips",
      description:
        "Paano gumagana ang reading/writing sa naturalization, official vocabulary, at libreng sentence drills with audio — kasama ang tamang civics bank. Walang sign-up.",
      sections: [
        {
          heading: "Ano ang dapat mong ipakita",
          body: "Maliban kung exempt, kailangan mong ipakita ang basic English: speaking sa interview, basahin nang tama ang isang pangungusap, at isulat nang tama ang isa (limitado ang attempts).",
        },
        {
          heading: "Manatili sa official vocabulary",
          body: "Ang reading/writing ay gumagamit ng USCIS vocabulary lists. Mas mahina ang random English apps kaysa sentences mula sa mga salitang iyon.",
        },
        {
          heading: "Paraan ng practice",
          body: "Pakinggan ang sentence, basahin nang malakas, isulat mula sa dictation. Check spelling. Ulitin kinabukasan ang namiss.",
        },
        {
          heading: "Kasama ang civics — tamang bank muna",
          body: "Hindi nagbago ang reading/writing sa 2025 civics update, pero ang civics bank ay depende pa rin sa N-400 o 65/20. Kumpirmahin ang version, tapos mag-practice ng English dito nang libre.",
        },
        {
          heading: "Mag-practice dito nang libre",
          body: "Buksan ang English reading at writing pages. Idagdag ang civics speak mode at interview simulation — start in seconds, walang account.",
        },
      ],
    },
  },
};

for (const loc of Object.keys(BODIES)) {
  const p = path.join(dir, `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [slug, copy] of Object.entries(BODIES[loc])) {
    data[slug] = copy;
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("bodies", loc, Object.keys(BODIES[loc]).length);
}
console.log("done");
