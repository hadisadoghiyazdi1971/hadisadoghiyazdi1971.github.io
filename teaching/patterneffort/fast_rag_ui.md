---
layout: persian  # یا single با کلاس rtl-layout
classes: wide rtl-layout
dir: rtl
title: "fast_rag_ui"
permalink: /teaching/studenteffort/patterneffort/fast_rag_ui/
author_profile: true

header:
  overlay_image: "/assets/images/background.jpg"
  overlay_filter: 0.3
  overlay_color: "#5e616c"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"

---

# fast rag ui


**نویسنده**: محمد صالح علی اکبری

<img src="https://quera.org/media/CACHE/images/public/avatars/8e111895562e470888dde40a0018e0eb/f93253aa8612f91a5a7b7f9d25cfabd4.jpg" />

<a href="https://github.com/mohammadsaleh40" target = "_blank">
<img src="https://img.shields.io/badge/GitHub-mohammadsaleh40-181717?logo=github&logoColor=white&style=flat-square" />

<a href="mailto:mohammadsalehmohammadsaleh@gmail.com" target = "_blank">
<img src="https://img.shields.io/badge/mohammadsalehmohammadsaleh%40gmail.com-EA4335?logo=gmail&logoColor=white&style=flat-square" />
</a>

دانشجوی مقطع کارشناسی ارشد

دانشکده: مرکز آموزش الکترونیکی

رشته: مهندسی کامپیوتر گرایش هوش مصنوعی و رباتیک


## شروع آماده سازی و نصب نرم‌افزارها روی سرور

آپدیت آدرس برنامه‌های سرور (ورژن و ...)

```
sudo apt update
```

نصب mysql روی سرور
```
sudo apt install -y mysql-server mysql-client
```

وارد شدن به برنامه mysql
```
sudo mysql
```

وارد کردن دستورات به داخل دیتاست
```
CREATE DATABASE rag_chat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'rag_user'@'localhost' IDENTIFIED BY 'salam';

GRANT ALL PRIVILEGES ON rag_chat_db.* TO 'rag_user'@'localhost';

FLUSH PRIVILEGES;

EXIT;
```

دریافت فایل‌ها از ریپازیتوری عمومی fast_rag_ui
```
git clone https://github.com/mohammadsaleh40/fast_rag_ui.git
cd fast_rag_ui
```

شروع ویرایش اون فایل به کمک 
```
nano .env
```

محتویاتی که باید در فایل '.env' قرار داد.
```
GOOGLE_API_KEY_1=AIzaSyAL2DHJoQm2jV2pMmdGVyd9t3Uq64vPQ
GOOGLE_API_KEY_2=AIzaSyBjbSo4ptgePEu9S0okAYzYvsxTf488
GOOGLE_API_KEY_3=AIzaSyCbYAWHJfkiBq9CJMbTbydn7lisDIvds
GOOGLE_API_KEY_4=AIzaSyBoDUK7pvK-wsqKFue--sEcabDGcwU3w
GOOGLE_API_KEY_5=AIzaSyCOOzqCPVImd9NLwh6HbLrmauUzz5QXI

# تنظیمات دیگر
DB_HOST=localhost
DB_USER=rag_user
DB_PASSWORD=salam
DB_NAME=rag_chat_db
MODEL_NAME=gemma-3-27b-it
HOST=0.0.0.0
PORT=2083
DEBUG=True
```

```
sudo apt install python3-pip
```

```
sudo apt install python3-venv
```

```
python3 -m venv venv
```

```
source venv/bin/activate
```

```
pip install --upgrade pip
```

```
pip install -r requirements.txt
```

```
python3 database_setup.py
```

‍‍‍```
uvicorn main:app --host 0.0.0.0 --port 8083
```

```
curl -X POST http://<IP سرور مثل 12.34.56.78>:8083/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"soltan","email":"masood@example.com","password":"mas789123","full_name":"ali"}'
```

