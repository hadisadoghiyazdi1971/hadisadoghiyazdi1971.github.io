---
layout: persian
classes: wide rtl-layout
dir: rtl
title: "آموزش Pull Request"
permalink: /teaching/studenteffort/patterneffort/PULL_REQUEST/
author_profile: true

header:
  overlay_image: "/assets/images/background.jpg"
  overlay_filter: 0.3
  overlay_color: "#5e616c"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
---



<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="https://upload.wikimedia.org/wikipedia/fa/e/e3/FUM_Logo.png" width="169" height="217" alt="FUM_LOGO" style="object-fit: contain;">
</div>


**نویسندگان:** محمدرضا باباگلی، محمدصالح علی اکبری  
**ايميل:** MohammadRezaBabagoli.AI@gmail.com  
**ايميل:** mohammadsalehmohammadsaleh@gmail.com  
دانشجویان ارشد هوش‌ مصنوعی دانشگاه فردوسی مشهد  
آزمایشگاه شناسایی الگو دکتر هادی صدوقی یزدی  

# Pull Request

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/pull_request_icon.png" width="150" height="100"  alt="pull_request_icon"  style="object-fit: contain;">
</div>  
  
## مقدمه

**Pull Request (PR)** مفهومی در سیستم‌های کنترل نسخه توزیع‌شده مانند Git است و بیشتر در پلتفرم‌هایی مثل GitHub، GitLab و Bitbucket استفاده می‌شود.

به طور ساده، Pull Request درخواستی است برای اینکه تغییراتی که در یک شاخه (branch) ایجاد کرده‌اید، به شاخه‌ی اصلی پروژه (مثلاً `main` یا `develop`) اضافه شود.

فرآیند معمول به این صورت است:

ابتدا یک branch جدید از شاخه اصلی می‌سازید. سپس تغییرات مورد نظر (مثلاً افزودن یک قابلیت یا اصلاح یک باگ) را اعمال و commit می‌کنید. بعد از آن branch را به مخزن راه‌دور (remote repository) push می‌کنید. در نهایت یک Pull Request ایجاد می‌کنید تا سایر اعضای تیم تغییرات را بررسی کنند.

Pull Request فقط برای ادغام کد نیست، بلکه یک ابزار همکاری است. در آن می‌توان:

* کد را بازبینی (Code Review) کرد
* درباره تغییرات بحث کرد
* تست‌های خودکار (CI) را اجرا کرد
* قبل از ادغام، مشکلات احتمالی را شناسایی کرد

پس از تأیید، تغییرات به شاخه مقصد merge می‌شوند.


Pull Request یعنی این‌که به صاحب یک پروژه بگویید:

«من یک‌سری تغییر در کد انجام داده‌ام. لطفاً بررسی کن و اگر درست بود، آن را به پروژه اصلی اضافه کن.»

فرض کنید چند نفر روی یک پروژه برنامه‌نویسی کار می‌کنند. هر نفر روی یک نسخه جداگانه (branch) کار می‌کند تا به نسخه اصلی آسیب نزند. وقتی کارش تمام شد، مستقیماً کد را وارد نسخه اصلی نمی‌کند. اول یک درخواست می‌فرستد تا بقیه کدش را ببینند، نظر بدهند، و اگر مشکلی نبود آن را تأیید کنند. این درخواست همان Pull Request است.

پس:

* شما تغییر ایجاد می‌کنید
* درخواست می‌دهید تغییرتان بررسی شود
* اگر تأیید شد، به پروژه اصلی اضافه می‌شود

در واقع Pull Request راهی است برای کنترل کیفیت و همکاری تیمی در برنامه‌نویسی.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/pull-request-process.png" alt="pull-request-process" style="width: 95%; height: 75%; object-fit: contain;">
</div>


## آموزش Pull Request برای مشاهده پروژه‌ها در سایت استاد 

**گام اول:**

در سال 1404، دانشجویان درس شناسایی الگو، به صورت زیر پروژه خود را در سایت استاد آپلود می‌کردند:

ابتدا یک شخص مخزن استاد را fork (ایجاد شاخهٔ مستقل از یک پروژه در حساب کاربری خود) می‌کند.

سپس دانشجویان دیگر، آن مخرن فورک‌شده را فورک می‌کنند تا این مخزن به مخازن هر دانشجو اضافه شود.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/fork.png" alt="fork" style="width: 95%; height: 75%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
fork کردن مخزن</p>

اکنون شما یک کپی مستقل  از مخزن روی سرور گیت‌هاب در اکانت خود دارید.
(می‌توانید از مخزن را در بخش Repositories حساب خود مشاهده کنید.)

**کاربرد اصلی fork:**

معمولاً زمانی استفاده می‌شود که می‌خواهید در یک پروژهٔ عمومی تغییر ایجاد کنید، بدون اینکه به مخزن اصلی دسترسی مستقیم (write access) داشته باشید. شما fork می‌کنید، تغییرات را روی نسخهٔ خود اعمال می‌کنید، سپس یک Pull Request به مخزن اصلی ارسال می‌کنید.


**گام دوم:**

اکنون وارد مخزن فورک‌شده بروید و پوشه teaching را پیدا کنید.

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/teaching_folder.png" alt="teaching_folder" style="width: 50%; height: 50%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
پوشه teaching</p>


سپس وارد پوشه patterneffort شوید.

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/patterneffort.png" alt="patterneffort" style="width: 50%; height: 50%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
پوشه patterneffort</p>

**اکنون در این پوشه فایل .md خود را بارگزاری کنید.**

**گام سوم:**
در این مرحله شما باید تصاویری که در فایل مارک‌داون استفاده کردید را در پوشه assets آپلود کنید.

در مخزن، دنبال پوشه assets بگردید.
سپس در پوشه assets، وارد پوشه paterneffort شوید

پوشه مناسب با پروژه خود را ایجاد کنید و فایل‌های تصویری خود را در آن پوشه آپلود کنید.

**نکته:**
در فایل مارک‌داون این مقاله که در حال مطالعه آن هستید، خط زیر وجود دارد:
```
permalink: /teaching/studenteffort/patterneffort/PULL_REQUEST/
```
این یعنی در پوشه assets،  باید فایل‌های تصاویر این مارک‌داون، در پوشه PULL_REQUEST باشد.



**گام چهارم:**
در این گام، در صفحه اول مخزن، بر روی گزینه Sync fork بزنید، سپس، گزینه Open pull request را بزنید.
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/sync_fork.png" alt="sync_fork" style="width: 85%; height: 75%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
انجام pull request</p>


در صفحه باز شده روی create pull request کلیک کنید.
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/create_pull_request.png" alt="create_pull_request" style="width: 85%; height: 75%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
create pull request</p>

در مرحله بعد (مهم) شما باید عنوان و یک دلیل را مشخص کنید که تغییری که می‌خواهید بدهید در رابطه با چه چیزی هست.
برای مشخص کردن دلیل باید یکی از سه موارد داده شده را از کامنت در بیاورید. برای مثال در تصویر زیر گزینه دوم از کامنت در آمده است:

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/title_reason.png" alt="title_reason" style="width: 85%; height: 75%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
افزودن عنوان و دلیل</p>


کمی اسکرول کنید و پایین بیاید، برای تایید اینکه می‌خواهید pull request انجام دهید باید تمام بلوک زیر را پاک کنید:

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/PULL_REQUEST/confirm.png" alt="confirm" style="width: 85%; height: 75%; object-fit: contain;">
</div>
<p class="wp-caption-text" style="margin-top: 8px; color: #555; align-items: center; text-align: center;">
پاک کردن بلوک برای تایید انجام pull request</p>

در نهایت روی گزینه create pull request کلیک کنید تا درخواست شما توسط مدیر قبول شود.

در صورت تایید مدیر، سپس تایید استاد، می‌توانید پروژه خود را در سایت استاد ببینید.

