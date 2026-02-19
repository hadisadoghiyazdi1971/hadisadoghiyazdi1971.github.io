---
layout: persian
classes: wide rtl-layout
dir: rtl
title: " تحلیل و کاهش تداخل الکترومغناطیسی در مبدل‌های سوئیچینگ ادامه"
permalink: /teaching/circuiteffort/Analysis_and_reduction_of_electromagnetic_interference_in_buck_converters_2/
author_profile: true
---

# تحلیل و کاهش تداخل الکترومغناطیسی در مبدل‌های سوئیچینگ - 2

## فهرست مطالب

<div dir="rtl">
<ul style="display:flex; flex-direction:column;">

	<li><a href="#اطلاعات-نویسنده">اطلاعات نویسنده</a></li>
	<li><a href="#مقدمه">مقدمه</a></li>
	<li><a href="#بررسی-یک-نمونه-جمر">بررسی یک نمونه جمر</a></li>
	<li><a href="#نحوه-عملکرد-مدار">نحوه عملکرد مدار</a></li>
	<li><a href="#نتایج-استفاده-از-جمر">نتایج استفاده از جمر</a></li>
	<li><a href="#نتیجه">نتیجه</a></li>
	<li><a href="#منابع">منابع</a></li>

</ul>
</div>

## اطلاعات نویسنده

**نام:** علی طلبی طرق
**وابستگی:** گروه مهندسی کامپیوتر، دانشگاه فردوسی مشهد
**ایمیل:** atalabi.002@gmail.com

## مقدمه

در حالی که "Interference" معمولاً به اشکال غیر عمدی اختلال در ارتباطات بی‌سیم اشاره دارد، "Jamming" به اختلال **عمدی** یا مسدود کردن چنین ارتباطاتی اشاره دارد.
همانطور که از نامش پیداست، آنتن‌های جمینگ (که به آن‌ها "جمر" هم گفته می‌شود) به طور خاص برای اختلال در نویز یا سیگنال‌های رادیویی استفاده می‌شوند.

یکی از رایج‌ترین کاربردهای انواع جمر در پمپ بنزین‌ها است. دلیل اصلی این است که استفاده از موبایل باعث گرم شدن دستگاه شده و در نتیجه خطر آتش‌سوزی را افزایش خواهد داد. پس به لحاظ حفظ امنیت جایگاه، با به کارگیری جمر از انتقال امواج و در نتیجه افزایش گرما جلوگیری میشود.


## بررسی یک نمونه جمر

میتوان با استفاده از چند خازن، ترانزیستور و سلف، یک جمر محدود و تاحدودی بی خطر ساخت. با توجه به نوع عملکرد جمر، روش های بی شماری برای تولید این دستگاه وجود دارد. میتوان برای نمونه چند مدار را بررسی کرد.


<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//normal_jammer.png" alt="A Simple Jammer Circuit" style="width: 40%; object-fit: contain;">
</div>/assets/circuiteffort/electromagnetic_interference
#electromagnetic_interference
<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 1: مدار جمر_
</div>


<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//high_voltage_jammer.png" alt="High Voltage Jammer" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 2: جمر با قابلیت تولید ولتاژ بالاتر_
</div>


در این بحث به سنتز مدار جمر با ولتاژ بالاتر خواهیم پرداخت. به این منظور تجهیزات مدنظر بدین صورت خواهد بود:
- سه عدد خازن با ظرفیت 22 پیکوفاراد
- یک عدد خازن با ظرفیت 68 پیکوفاراد
- منبع ولتاژ - 5 تا 30 ولت
- یک عدد مقاومت 10 کیلواهم
- یک عدد کویل با قطر 2.5 سانتی متر، قطر سیم 0.4 میلی متر و 65 دور
- یک عدد ترانزیستور 2SC2078 با نام تجاری NTE152

نکته: تمامی خازن ها سرامیکی با ظرفیت ولتاژی 500 ولت هستند.
نکته: توان مصرفی مقاومت 0.5 وات بوده و مقاومت تلرانس 5 درصدی (طلایی) خواهد داشت.
نکته: NTE152 نام تحاری ترانزیستور مورد استفاده بوده و استففاده از موارد مشابه مشکلی نخواهد داشت.

<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//T1_Transistor.png" alt="Details" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 3: نکات تجهیزات و جزئیات ترانزیستور_
</div>

با توجه به تجهیزات مورد استفاده، مدار باید به صورت زیر باشد:
<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//full_circuit.png" alt="Full Circuit" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 4: شماتیک کامل مدار جمر_
</div>

نکته: فرکانس دریافتی از مدار به ابعاد و ویژگی های سیم پیچ و ظرفیت خازن ها بستگی دارد.

## نحوه عملکرد مدار

در این مدار به جای استفاده از دو سیم پیچ و نیاز به رزونانس، دو مدار القاگر تعبیه شده است. این دو مدار هر کدام ظرفیت 22+68 پیکوفارادی داشته و نیاز به رزونانس رو برای فعالیت مدار از بین میبرد.

<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//oscillating_circuits_capacity.png" alt="Capacity" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 5: ظرفیت مدارهای القاگر_
</div>

به صورت دقیق تر، مدار های به این شکل خواهند بود:
- مدار القاگر یک
<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//oscillating_circuit_1.png" alt="1st Oscillator" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 6: مدار القاگر شماره یک_
</div>

- مدار القاگر دو
<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//oscillating_circuit_2.png" alt="2nd Oscillator" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 7: مدار القاگر شماره دو_
</div>

آنتن جمر به نقطه میان دو مدارالقاگر متصل میشود. به دلیل القای الکترومغناطیس حاصل از القاگر ها، amplitude بالا و بالاتر رفته و به همین دلیل ولتاژ در نقطه اتصال آنتن به مدار در ادامه آنقدر بالا خواهد بود که شدت میدان را به حدی بالا ببرد تا موج الکترومغناطیس حاصل از آنتن توانایی بهم ریختگی و ایجاد آشفتگی در امواج را داشته باشد.
به همین علت است که توصیه میشود تمام خازن ها، استقامت دی‌الکتریک مشابه و بسیار بالایی داشته باشند تا دچار شکست نشوند.

## نتایج استفاده از جمر
با اینکه قدرت این جمر کم و به نوعی بی خطر محسوب میشود، اما استفاده از جمر ها میتواند نتایج نامطلوبی را از قبیل از بین رفتن مدارات و تجهیزات دستگاه های الکترونیکی، تداخل در امواج حساس و ... را به همراه داشته باشد. پس توصیه میشود در تولید و نهایتا در استففاده از مدار های جمر این موارد مدنظر قرار گیرد.

در نمونه های زیر میتوان تاثیر این مدار جمر را روی لامپ و یک ماشین حساب دیجیتالی مشاهده کرد.

- تاثیر مدار جمر روی لامپ

<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//jammer_and_lamp.png" alt="Lamp" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 8: روشن شدن لامپ در اثر امواج الکترومغناطیس حاصل از مدار_
</div>

- تاثیر مدار جمر روی ماشین حساب
<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//jammer_and_calc_1.png" alt="Calculator - 1" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 9: آشفتگی و از بین رفتن داده ها در ماشین حساب در اثر امواج الکترومغناطیس حاصل از مدار - 1_
</div>

<div style="display: flex; justify-content: center; gap: 10px; margin-top:40px">
	<img src="/assets/circuiteffort/electromagnetic_interference_in_buck_convertersimages//jammer_and_calc_2.png" alt="Calculator - 2" style="width: 40%; object-fit: contain;">
</div>

<div class="caption"  style="text-align: center; margin-top: 8px; margin-bottom:15px">
_تصویر 10:  آشفتگی و از بین رفتن داده ها در ماشین حساب در اثر امواج الکترومغناطیس حاصل از مدار - 2_
</div>

## نتیجه

در دومین فاز از پروژه تداخل الکترومغناطیسی، به بررسی ساخت و عملکرد یک جمر ساده با استفاده از مدارهای القاگر و اجزای الکترونیکی خاص پرداخته شد. نتایج نشان داد که جمر با استفاده از اجزای مختلف مانند خازن‌ها، ترانزیستور و کویل قادر است سیگنال‌ها را قطع کرده و موج‌های الکترومغناطیسی تولید کند که می‌تواند اختلالات قابل توجهی در سیستم‌های الکترونیکی ایجاد کند. با این حال، باید توجه داشت که استفاده از چنین دستگاه‌هایی ممکن است منجر به آسیب به تجهیزات حساس الکترونیکی یا ایجاد تداخل در سیستم‌های دیگر شود، بنابراین طراحی و استفاده از این مدارها باید با دقت و احتیاط انجام گیرد.

## منابع 

- https://www.sciencedirect.com/topics/engineering/jammer
- https://www.sciencedirect.com/topics/engineering/jamming
- https://www.sciencedirect.com/science/article/pii/S2542660520301359
- https://jemengineering.com/blog-an-introduction-to-jammers/
- https://www.sbg-systems.com/glossary/jammer/
- https://www.youtube.com/watch?v=mFbi3Aqn8m8&list=PLOWaPB-Ur3Jia_XOV7TWTkMxqi7_J9rz0
