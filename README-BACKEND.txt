M5K Backend v3

M5K Backend v2

المتطلبات: Node.js 18+ و MySQL 8+ (أو MariaDB حديث).

تشغيل صحيح:
1) شغّل Apache (اختياري) و MySQL من XAMPP. Backend نفسه لا يحتاج Apache.
2) افتح phpMyAdmin واستورد backend/database.sql.
3) داخل backend انسخ .env.example إلى .env وعدّل DB_PASSWORD وJWT_SECRET.
4) افتح CMD داخل مجلد backend ونفّذ: npm install
5) ثم: npm start
6) افتح المتصفح على: http://localhost:3000

مهم: لا تفتح index.html بالنقر المزدوج (file://)، لأن حسابات الـBackend تحتاج الخادم.

الحساب:
- إنشاء الحساب: اسم مستخدم + بريد إلكتروني + كلمة مرور.
- تسجيل الدخول: يمكنك استخدام اسم المستخدم أو البريد الإلكتروني.

إذا ظهر NetworkError:
- تأكد أن نافذة CMD فيها: M5K Backend running: http://localhost:3000
- افتح http://localhost:3000 وليس ملف index.html مباشرة.
- جرّب http://localhost:3000/api/health؛ يجب أن تظهر {"ok":true,"database":true}.

المزايا: حسابات، تسجيل دخول، حفظ النتائج في MySQL، متصدرون عالميون، ملف API عام.
