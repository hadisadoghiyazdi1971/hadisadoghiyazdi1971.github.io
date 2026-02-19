---
layout: persian
classes: wide rtl-layout
dir: rtl
title: "بینایی-زبان-کنش"
permalink: /teaching/patterneffort/vla
author_profile: true

header:
  overlay_image: "/assets/images/background.jpg"
  overlay_filter: 0.3
  overlay_color: "#5e616c"
  caption: "Photo credit: [Unsplash](https://unsplash.com)"
---

# بینایی–زبان–کنش Vision–Language–Action (VLA)

---

<div style="display: flex; justify-content: start; align-items: center; gap: 10px;">
    <img src="https://upload.wikimedia.org/wikipedia/fa/e/e3/FUM_Logo.png" width="169" height="217" alt="STFT-overview" style="object-fit: contain;">
</div>

<div style="display: flex; justify-content: start; align-items: center; gap: 10px; ">
    <img src="/assets/patterneffort/vla/myphoto.jpg" alt="vla_1" style="width: 200px; height: 200px; object-fit: contain;">
</div>

**نویسنده**: مهدیه ارغوانی

**ایمیل :** [arghavany.ma@gmail.com](mailto:arghavany.ma@gmail.com)

**دانشگاه فردوسی مشهد**
**دانشکده مهندسی**
**گروه کامپیوتر**

---

دانشجوی ارشد هوش‌ مصنوعی دانشگاه فردوسی مشهد  
بینایی کامپیوتر دکتر هادی صدوقی یزدی 

---

## بینایی-زبان-کنش

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770648721570.jpg" alt="vla_2" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
جهان  به‌سمت راحتی و هوشمندی حرکت می‌کند  
</div>
زندگی ما انسان‌ها همیشه به سمت ساده‌تر شدن پیش می‌رود.هر نسل، بخشی از کارهای سخت را به ابزارها سپرده است:  از چرخ و آسیاب گرفته تا ماشین لباسشویی و جاروبرقی.

اما حالا وارد مرحله ی جدیدی شده‌ایم: مرحله‌ای که در آن ابزارها فقط کار نمی‌کنند؛ بلکه می‌فهمند چه باید بکنند. تصور کنید چند سال آینده، سن‌تان بالا رفته و دیگر نمی‌خواهید برای هر کاری از جا بلند شوید. فقط می‌گویید:

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770643337038.jpg" alt="vla_3" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
«شام برام قورمه‌سبزی درست کن.»
</div>


و چند ساعت بعد، بدون هیچ زحمتی، غذای گرم جلوی شماست. ربات محیط را دیده، حرف شما را فهمیده و عمل مناسب را انتخاب کرده است. این دقیقاً همون چیزیه که بهش می‌گویند **VLA** یا **Vision-Language-Action**.

هر موجود هوشمند – از انسان گرفته تا یک ربات پیشرفته – برای انجام یک کار ساده، سه مرحله را طی می‌کند:
- می‌بیند  
- می‌فهمد  
- عمل می‌کند

در مدل‌های VLA، این سه مرحله در یک چرخه ی واحد به هم متصل می‌شوند.  
این یعنی ربات فقط یک دوربین نیست، فقط یک پردازشگر زبان نیست، و فقط یک بازوی مکانیکی نیست.  
او یک «عامل» است که:
- از دیدن، معنا استخراج می‌کند  
- از زبان، هدف استخراج می‌کند  
- و از کنش، تغییر ایجاد می‌کند  
چرخه‌ای که در آن **«تصویر»** ، **«زبان»** و **«کنش»** نه جدا از هم، بلکه به صورت واحد عمل می‌کنند

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770000721570.jpg" alt="vla_4" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
چرخه vla
</div>


### پرسش بنیادین: ربات چطور می‌فهمد چه باید بکند؟
وقتی شما می‌گویید  **غذا درست کن** ، این فقط یک جمله است. وقتی ربات آشپزخانه را می‌بیند، این فقط مجموعه‌ای از پیکسل‌هاست.
اما ربات باید بفهمد:
- کدام شیء قابلمه است؟  
- کدام ماده غذایی سبزی است؟  
- کدام مرحله اول است؟  
- چه حرکتی باعث رسیدن به هدف می‌شود؟  

VLA دقیقاً برای حل همین مسئله ساخته شده:  
اتصال جهان تصویر و جهان زبان به جهان عمل.

## تعریف ساده VLA  
VLA مدلی است که:
- تصویر را به معنا تبدیل می‌کند  
- زبان را به هدف تبدیل می‌کند  
- و سپس عمل مناسب را انتخاب می‌کند  
این تعریف ساده، پایه ی بسیاری از ربات‌های حال و آینده است.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770673402528.jpeg" alt="vla_5" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
مثال شهودی: ربات آشپز    
</div>

### ربات آشپز
1. آشپزخانه را نگاه می‌کند  
2. دستور شما را می‌شنود  
3. تصمیم می‌گیرد چه کاری انجام دهد  
4. غذا را آماده می‌کند  
5. دوباره محیط را می‌بیند تا مطمئن شود همه‌چیز درست پیش می‌رود  

این چرخه تا رسیدن به هدف ادامه دارد.


### کاربردهای گسترده: از آشپزخانه تا باغ  
VLA فقط برای آشپزی نیست.  در کشاورزی، سلامت، خودروهای خودران و ده‌ها حوزهٔ دیگر کاربرد دارد. مثلاً در باغ می‌گویید:

«سیب‌های قرمز را بچین و داخل سبد بگذار.»
- باغ را نگاه می‌کند  
- اولین سیب قرمز را پیدا می‌کند  
- آن را می‌چیند  
- دوباره نگاه می‌کند  
- و این روند را تکرار می‌کند  
تا زمانی که همهٔ سیب‌ها جمع شوند یا شما دستور جدیدی بدهید.

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/Screenshot_yyy_Google.jpg" alt="vla_6" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
ربات  کشاورز
</div>


### مثال شهودی - محافظت از انسان ها
کارهای بسیاری وجود دارد که جان انسان ها را به خطر می اندازد ولی مجبورا انسان ها انها را انجام می دهند به عنوان مثال جوشکاری در اعماق آب، یا نجات یک انسان از آتش

ربات امدادگر در یک ساختمان آتش‌گرفته  
تصور کنید ساختمانی آتش گرفته و دود همه‌جا را پوشانده است.  
یک ربات امدادگر وارد می‌شود.

- می‌بیند: اتاق‌ها تاریک‌اند، دود زیاد است، مسیرها نامشخص‌اند  
- می‌شنود: «کودک را پیدا کن و بیرون بیاور»  
- عمل می‌کند: مسیر امن را انتخاب می‌کند، موانع را دور می‌زند، کودک را پیدا می‌کند و او را بیرون می‌آورد  

اینجا VLA نه فقط برای راحتی، بلکه برای نجات جان انسان‌ها به کار می‌رود.

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770644724394.jpeg" alt="vla_7" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
ربات امدادگر
</div>


## معماری VLA
پنج مرحلهٔ اصلی

می خواهیم معماری بینایی-زبان-کنش را از لحاظ مفهومی بررسی کنیم

### ۱) رمزگذار بینایی – تبدیل پیکسل‌ها به مفهوم  
ربات روبه‌روی یک در ایستاده است.  
آنچه می‌بیند فقط پیکسل‌های قهوه‌ای است.  
اما مدل باید بفهمد:

- این یک در است  
- لبه‌ها کجاست  
- دستگیره کجاست  
این مرحله، تصویر خام را به معنای قابل‌فهم تبدیل می‌کند.
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/copilot_image_1770641397973.jpeg" alt="vla_8" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
رمزگذار بینایی
</div>

### ۲) رمزگذار زبان – تبدیل دستور به ساختار قابل‌فهم  
شما می‌گویید:

«در را باز کن.»

این جمله باید به شکل ساختاری تبدیل شود که مدل بفهمد:

- شیء هدف: در  
- عمل موردنظر: باز کردن  

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770642359437.jpg" alt="vla_9" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
رمز گذار زبان
</div>

### ۳) ادغام بینایی و زبان – اتصال دو ورودی  
در این مرحله، مدل تصویر «در» و دستور «باز کن» را کنار هم قرار می‌دهد.  
می‌فهمد:

«این همان شیئی است که باید روی آن عمل کنم.»

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770642108907.jpg" alt="vla_10" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
ادغام بینایی و زبان
</div>

### ۴) سیاست کنش – انتخاب بهترین عمل  

ربات تصمیم می‌گیرد:
- دستگیره کجاست؟  
- باید فشار بدهد یا بکشد؟  
- دست را چطور حرکت دهد؟  

این مرحله همان «تصمیم‌گیری» است.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770641908024.jpg" alt="vla_11" style=" object-fit:contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
سیاست کنش
</div>

### ۵) چرخهٔ ادراک–زبان–کنش – تکرار تا رسیدن به هدف  
ربات عمل را انجام می‌دهد:  
دستگیره را فشار می‌دهد و در را باز می‌کند.

اما کار تمام نمی‌شود.  
او دوباره محیط را می‌بیند:

- آیا در باز شد؟  
- آیا باید عقب برود؟  
- آیا دستور جدیدی وجود دارد؟

این چرخه تا رسیدن به هدف ادامه پیدا می‌کند.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/copilot_image_1770642621152.jpeg" alt="vla_12" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
تکرار تا رسیدن به هدف
</div>

### پیاده سازی چرخه vla 
تا اینجا با مفهوم این چرخه آشنا شدیم و می خواهیم ربات سرآشپز که در بالا درمورد آن صحبت کردیم را پیاده سازی کنیم.در قدم اول کتابخانه های موردنیاز را فراخوانی می کنیم

```python
from dataclasses import dataclass
from typing import List, Dict, Tuple
import time
from enum import Enum
import random

  ```

قبل از ورد به چرخه باید یک سری مفاهیم تعریف شوند به عنوان مثال مواد اولیه و کلاس مواد و محیط آشپزخانه که در کد زیر تعریف شده اند

```python
class KitchenObjectType(Enum):
    MEAT = "گوشت"
    VEGETABLE = "سبزی"
    BEAN = "لوبیا"
    POT = "قابلمه"
    ONION = "پیاز"
    SPICE = "ادویه"

@dataclass
class KitchenObject:
    type: KitchenObjectType
    description: str = ""
    prepared: bool = False

@dataclass
class Kitchen:
    objects: List[KitchenObject]
  ```

اولین مرحله چرخه که رمزگذار بینایی است وارد عمل می شود. دراین مرحله باید محیط شناسایی شود

```python
class VisionEncoder:    
    def __init__(self):
        print("✅ چشم‌های ربات فعال شد")
    
    def detect_objects(self, kitchen: Kitchen) -> List[Dict]:
        detected_objects = []
        for obj in kitchen.objects:
            detection = {
                'type': obj.type,
                'description': obj.description or f"یک {obj.type.value}",
                'prepared': obj.prepared
            }
            detected_objects.append(detection)
        
        print("\n👁️ مواد قابل مشاهده در آشپزخانه:")
        for obj in detected_objects:
            status = "✅ آماده" if obj['prepared'] else "⏳ نیاز به آماده‌سازی"
            print(f"   - {obj['type'].value}: {status}")
        
        return detected_objects
 ```
 <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770644135950.jpeg" alt="vla_13" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
آشپزخانه
</div>

دراین مرحله ربات دستوری که می دهیم را متوجه شود
```python
class LanguageEncoder:    
    def __init__(self):
        print("✅ گوش‌های ربات فعال شد")
    
    def understand_command(self, command: str) -> Dict:
        print(f"\n🗣️ دستور سرآشپز: '{command}'")
        
        if "قورمه" in command or "سبزی" in command:
            print("🧠 درک شد: دستور پخت قورمه‌سبزی")
            return {
                'recipe': 'ghormeh_sabzi',
                'steps': ['آماده‌سازی', 'پخت', 'سرو']
            }
        else:
            print("🧠 درک نشد!")
            return {'recipe': 'unknown'}
 ```
 در این مرحله ربات دستور گفته شده را با آن چیزی که ربات دیده است.ادغام می کند

 ```python
 class VisionLanguageFusion:
    
    def __init__(self):
        print("✅ مغز ربات فعال شد")
        self.ingredients_status = {}
    
    def fuse(self, detected_objects: List[Dict], command: Dict) -> Dict:        
        if command['recipe'] != 'ghormeh_sabzi':
            return {'success': False, 'message': 'دستور نامشخص'}
        
        required = ['گوشت', 'سبزی', 'لوبیا', 'پیاز', 'ادویه', 'قابلمه']
        self.ingredients_status = {item: False for item in required}
       
        for obj in detected_objects:
            if obj['type'].value in self.ingredients_status:
                self.ingredients_status[obj['type'].value] = True
        
        print("\n📋 بررسی مواد اولیه قورمه‌سبزی:")
        missing = []
        for item, available in self.ingredients_status.items():
            if available:
                print(f"   ✅ {item}: موجود")
            else:
                print(f"   ❌ {item}: نیست!")
                missing.append(item)
        
        if missing:
            return {
                'success': False,
                'message': f"⚠️ مواد گمشده: {', '.join(missing)}"
            }
        
        return {
            'success': True,
            'recipe': 'ghormeh_sabzi',
            'all_ingredients': True
        }
  ``` 
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770673418174.jpeg" alt="vla_14" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
ربات باید تصمیم بگیرد
</div>

در این مرحله ربات تصمیم می گیرد که چه کاری را انجام دهد
```python  
class ActionPolicy:    
    def __init__(self):
        self.current_stage = 0 
        self.step_counter = 0
        print("✅ دست‌های ربات فعال شد")
        self.stages = [
            {
                'name': 'آماده‌سازی',
                'actions': [
                    'خرد کردن پیاز',
                    'خرد کردن گوشت',
                    'خرد کردن سبزی',
                    'خرد کردن لوبیا'
                ]
            },
            {
                'name': 'پخت',
                'actions': [
                    'برداشتن قابلمه',
                    'ریختن مواد داخل قابلمه',
                    'اضافه کردن ادویه',
                    'پختن روی حرارت'
                ]
            },
            {
                'name': 'سرو',
                'actions': [
                    'برداشتن قابلمه از روی گاز',
                    'کشیدن غذا در ظرف'
                ]
            }
        ]
    
    def decide_action(self) -> Dict:
        
        if self.current_stage >= len(self.stages):
            return {
                'action': 'serve',
                'details': '✨ قورمه‌سبزی آماده است! نوش جان!',
                'complete': True
            }
        
        current = self.stages[self.current_stage]
        
        if self.step_counter < len(current['actions']):
            action = current['actions'][self.step_counter]
            self.step_counter += 1
            
            return {
                'action': action,
                'stage': current['name'],
                'progress': f"گام {self.step_counter} از {len(current['actions'])}",
                'complete': False
            }
        else:
            self.current_stage += 1
            self.step_counter = 0
            
            if self.current_stage < len(self.stages):
                return {
                    'action': f"شروع مرحله {self.stages[self.current_stage]['name']}",
                    'stage': self.stages[self.current_stage]['name'],
                    'complete': False
                }
            else:
                return {
                    'action': '✨ قورمه‌سبزی آماده است! نوش جان!',
                    'complete': True
                }    
``` 
در این مرحله باید چرخه ی اصلی سرآشپز را بنویسیم

```python 
class ChefVLA:    
    def __init__(self):
        self.vision = VisionEncoder()
        self.language = LanguageEncoder()
        self.fusion = VisionLanguageFusion()
        self.action = ActionPolicy()
        
        self.step_count = 0
        self.task_complete = False
        
        print("\n" + "="*60)
        print("👨‍🍳 ربات سرآشپز قورمه‌سبزی پزی آماده است!")
        print("="*60)
    
    def cook(self, kitchen: Kitchen):        
        detected = self.vision.detect_objects(kitchen)
        command = "قورمه سبزی بپز"
        understood = self.language.understand_command(command)
        check = self.fusion.fuse(detected, understood)
        
        if not check['success']:
            print(f"\n❌ {check['message']}")
            return
        
        print("\n✅ همه مواد موجود است. شروع پخت...")
        time.sleep(1)
        
        while not self.task_complete:
            self.step_count += 1
            print(f"\n{'='*50}")
            print(f"مرحله {self.step_count}")
            print(f"{'='*50}")
            
            result = self.action.decide_action()
            print(f"👨‍🍳 {result['action']}")
            
            if 'stage' in result:
                print(f"   مرحله: {result['stage']}")
            if 'progress' in result:
                print(f"   {result['progress']}")
            
            if result.get('complete'):
                self.task_complete = True
            
            time.sleep(1) 
def create_kitchen():
    """ایجاد آشپزخانه با مواد قورمه‌سبزی"""
    return Kitchen(
        objects=[
            KitchenObject(KitchenObjectType.MEAT, "گوشت گوسفندی"),
            KitchenObject(KitchenObjectType.VEGETABLE, "سبزی قورمه‌سبزی"),
            KitchenObject(KitchenObjectType.BEAN, "لوبیا قرمز"),
            KitchenObject(KitchenObjectType.ONION, "پیاز"),
            KitchenObject(KitchenObjectType.SPICE, "ادویه"),
            KitchenObject(KitchenObjectType.POT, "قابلمه")
        ]
    )
if __name__ == "__main__":
    print("="*60)
    print("🍲  پخت قورمه‌سبزی با ربات سرآشپز  🍲")
    print("="*60)
    
    kitchen = create_kitchen()
    
    print("\n📋 مواد اولیه در آشپزخانه:")
    for obj in kitchen.objects:
        print(f"   • {obj.type.value}: {obj.description}")
    
    print("\n👨‍🍳 شروع پخت قورمه‌سبزی...")
    time.sleep(2)
    
    chef = ChefVLA()
    chef.cook(kitchen)
    
    print("\n" + "="*60)
    print("🎉  پخت با موفقیت انجام شد!  🎉")
    print("="*60)
    print(f"\n📊 تعداد مراحل: {chef.step_count}")
```
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/image_1770643582715.png" alt="vla_15" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
خروجی نهایی
</div>

با اجرای این کد می توانیم خروجی زیر را ببینیم

```python 
============================================================
🍲  پخت قورمه‌سبزی با ربات سرآشپز  🍲
============================================================
📋 مواد اولیه در آشپزخانه:
   • گوشت: گوشت گوسفندی
   • سبزی: سبزی قورمه‌سبزی
   • لوبیا: لوبیا قرمز
   • پیاز: پیاز
   • ادویه: ادویه
   • قابلمه: قابلمه
👨‍🍳 شروع پخت قورمه‌سبزی...
============================================================
👨‍🍳 ربات سرآشپز قورمه‌سبزی پزی آماده است!
============================================================
✅ چشم‌های ربات فعال شد
✅ گوش‌های ربات فعال شد
✅ مغز ربات فعال شد
✅ دست‌های ربات فعال شد
👁️ مواد قابل مشاهده در آشپزخانه:
   - گوشت: ⏳ نیاز به آماده‌سازی
   - سبزی: ⏳ نیاز به آماده‌سازی
   - لوبیا: ⏳ نیاز به آماده‌سازی
   - پیاز: ⏳ نیاز به آماده‌سازی
   - ادویه: ⏳ نیاز به آماده‌سازی
   - قابلمه: ⏳ نیاز به آماده‌سازی
🗣️ دستور سرآشپز: 'قورمه سبزی بپز'
🧠 درک شد: دستور پخت قورمه‌سبزی
📋 بررسی مواد اولیه قورمه‌سبزی:
   ✅ گوشت: موجود
   ✅ سبزی: موجود
   ✅ لوبیا: موجود
   ✅ پیاز: موجود
   ✅ ادویه: موجود
   ✅ قابلمه: موجود
✅ همه مواد موجود است. شروع پخت...
==================================================
مرحله 1
==================================================
👨‍🍳 خرد کردن پیاز
   مرحله: آماده‌سازی
   گام 1 از 4
==================================================
مرحله 2
==================================================
👨‍🍳 خرد کردن گوشت
   مرحله: آماده‌سازی
   گام 2 از 4
==================================================
مرحله 3
==================================================
👨‍🍳 خرد کردن سبزی
   مرحله: آماده‌سازی
   گام 3 از 4
==================================================
مرحله 4
==================================================
👨‍🍳 خرد کردن لوبیا
   مرحله: آماده‌سازی
   گام 4 از 4
==================================================
مرحله 5
==================================================
👨‍🍳 شروع مرحله پخت
   مرحله: پخت
==================================================
مرحله 6
==================================================
👨‍🍳 برداشتن قابلمه
   مرحله: پخت
   گام 1 از 4
==================================================
مرحله 7
==================================================
👨‍🍳 ریختن مواد داخل قابلمه
   مرحله: پخت
   گام 2 از 4
==================================================
مرحله 8
==================================================
👨‍🍳 اضافه کردن ادویه
   مرحله: پخت
   گام 3 از 4
==================================================
مرحله 9
==================================================
👨‍🍳 پختن روی حرارت
   مرحله: پخت
   گام 4 از 4
==================================================
مرحله 10
==================================================
👨‍🍳 شروع مرحله سرو
   مرحله: سرو
==================================================
مرحله 11
==================================================
👨‍🍳 برداشتن قابلمه از روی گاز
   مرحله: سرو
   گام 1 از 2
==================================================
مرحله 12
==================================================
👨‍🍳 کشیدن غذا در ظرف
   مرحله: سرو
   گام 2 از 2
==================================================
مرحله 13
==================================================
👨‍🍳 ✨ قورمه‌سبزی آماده است! نوش جان!
============================================================
🎉  پخت با موفقیت انجام شد!  🎉
============================================================
📊 تعداد مراحل: 13
```

## چرا این چرخه مهم است؟  

زیرا جهان واقعی ثابت نیست.  
هر لحظه چیزی تغییر می‌کند:

- نور کم می‌شود  
- شیء جابه‌جا می‌شود  
- انسان دستور جدید می‌دهد  
- مانعی ظاهر می‌شود  

VLA باید بتواند در لحظه تصمیمش را اصلاح کند.  
این همان چیزی است که آن را از مدل‌های سادهٔ بینایی یا زبان جدا می‌کند.


<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="/assets/patterneffort/vla/Screenshot_22_Google.jpg" alt="vla_16" style=" object-fit: contain;">
</div>
<div class="caption" style="text-align: center; margin-top: 8px;color: rgba(52, 51, 51, 1)">
مثال هایی از vla
</div>
برای دیدن مثال های عملی به <a href="https://youtu.be/Zn8yMaepzVk?si=i4db1ljrlZlMfEir " style="display:inline ;text-decoration:underline; color:rgba(15, 134, 218, 1);" target="_blank">
اینجا
</a> و <a href=" https://youtu.be/XfhkdQWO31M?si=k6i45D-PtjmGI_Ee" style="display:inline ;text-decoration:underline; color:rgba(15, 134, 218, 1);" target="_blank">
اینجا
</a>مراجعه کنید.

VLA و آیندهٔ هوش مصنوعی  
هرجا لازم باشد:

- محیط دیده شود  
- دستور فهمیده شود  
- و عملی مناسب انتخاب شود  

VLA می‌تواند نقش‌آفرینی کند.

این یعنی:

- ربات‌های خانگی  
- ربات‌های کشاورزی  
- خودروهای خودران  
- ربات‌های امدادگر  
- بازوهای صنعتی هوشمند  

همه و همه بر پایهٔ همین چرخه ساخته می‌شوند.



---

#برای نوشتن کد و یادگیری بهتر می توانید به لینک های زیر مراجعه کنید

<ul>

  <li>
    <a href="https://openvla.github.io/" style="text-decoration:underline; color:green;" target="_blank">
        https://openvla.github.io/
    </a>
  </li>

  <li>
    <a href="https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/" style="text-decoration:underline; color:green;" target="_blank">
        RT‑2: New Model Translates Vision and Language into Action
    </a>
  </li>

  <li>
    <a href="https://robotics-transformer1.github.io/" style="text-decoration:underline; color:green;" target="_blank">
        https://robotics-transformer1.github.io/
    </a>
  </li>

  <li>
    <a href="https://www.digitalocean.com/community/conceptual-articles/vision-language-action-models" style="text-decoration:underline; color:green;" target="_blank">
        Vision‑Language‑Action Models — DigitalOcean
    </a>
  </li>

  <li>
    <a href="https://deepmind.google/models/gemini-robotics/gemini-robotics/" style="text-decoration:underline; color:green;" target="_blank">
        Gemini Robotics — Google DeepMind
    </a>
  </li>

  <li>
    <a href="https://learnopencv.com/vision-language-action-models-lerobot-policy/#aioseo-5-aloha-from-google-deepmind" style="text-decoration:underline; color:green;" target="_blank">
        Vision‑Language‑Action Models — LearnOpenCV
    </a>
  </li>

  <li>
    <a href="https://robotics-transformer2.github.io/#demo" style="text-decoration:underline; color:green;" target="_blank">
        Robotics Transformer 2 (RT‑2) — Demo
    </a>
  </li>

  <li>
    <a href="https://github.com/google-research/roboticstransformer" style="text-decoration:underline; color:green;" target="blank">
        https://github.com/google-research/robotics_transformer
    </a>
  </li>

  <li>
    <a href="https://say-can.github.io/" style="text-decoration:underline; color:green;" target="_blank">
        https://say-can.github.io/
    </a>
  </li>

  <li>
    <a href="https://en.wikipedia.org/wiki/Vision-language-actionmodel" style="text-decoration:underline; color:green;" target="blank">
        Vision‑Language‑Action Model — Wikipedia
    </a>
  </li>

  <li>
    <a href="https://arxiv.org/pdf/2505.04769" style="text-decoration:underline; color:green;" target="_blank">
        https://arxiv.org/pdf/2505.04769
    </a>
  </li>

</ul>
