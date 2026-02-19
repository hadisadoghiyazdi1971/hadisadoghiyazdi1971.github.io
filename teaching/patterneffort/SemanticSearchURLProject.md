---
layout: persian
classes: wide rtl-layout
dir: rtl
title: "جست و جوی معنایی صفحات وب"
permalink: /teaching/studenteffort/patterneffort/SemanticSearchURLProject/
author_profile: true

header:
  overlay_image: "/assets/images/background.jpg"
  overlay_filter: 0.3
  overlay_color: "#5e616c"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
---


# Semantic Search & Rag System on Website Chatbot
**Pattern Recognition**
**Author : Seyyed Mohammad Mousavi**

## 1) Semantic Search

Semantic search means “search by meaning”, not just by matching exact words.

In a normal keyword search, if you type *"install python on windows"*, the search engine mostly looks for pages that contain those exact words. That can miss good results that explain the same idea with different wording.

In semantic search, we convert text into **embeddings**: a list of numbers that represents the meaning of the text. If two pieces of text are about similar ideas, their embeddings become close to each other in that numeric space.  
So when you ask a question, the system finds the chunks of text whose meaning is closest to your question’s meaning.

In practice, semantic search is usually built with these steps:
- Collect documents (web pages, PDFs, notes, etc.)
- Clean the text
- Split into smaller pieces (**chunks**)
- Turn chunks into embeddings
- Store embeddings in a vector index (for fast similarity search)
- For a new question, embed the question and retrieve the most similar chunks

Semantic Search یعنی «جست‌وجو بر اساس معنی»، نه فقط پیدا کردن کلماتِ دقیق.

در جست‌وجوی معمولی (Keyword Search)، موتور جست‌وجو بیشتر دنبال صفحاتی می‌گردد که همان کلماتِ شما را داشته باشند. مشکل اینجاست که ممکن است یک صفحه دقیقاً جواب شما را بدهد، اما با کلمات دیگری نوشته شده باشد و در نتایج نیاید.

در جست‌وجوی معنایی، متن‌ها را به چیزی به نام **Embedding** تبدیل می‌کنیم: یک لیست عددی که «معنی» متن را نمایندگی می‌کند. اگر دو متن از نظر مفهوم شبیه باشند، بردارهای عددی‌شان هم به هم نزدیک می‌شود.  
پس وقتی شما سؤال می‌پرسید، سیستم بخش‌هایی از متن را پیدا می‌کند که از نظر معنی به سؤال شما نزدیک‌ترند.

به طور خلاصه، روند ساخت semantic search معمولاً این‌طوری است:
- جمع‌آوری سندها (صفحات وب، PDF، یادداشت‌ها و …)
- تمیز کردن متن
- تقسیم به قطعه‌های کوچک‌تر (**Chunk**)
- تبدیل هر chunk به embedding
- ذخیره کردن embeddingها داخل یک ساختار جست‌وجوی برداری (برای پیدا کردن سریع متن‌های مشابه)
- وقتی سؤال جدید می‌آید، embedding سؤال ساخته می‌شود و نزدیک‌ترین chunkها برگردانده می‌شوند


## 2) LangChain

LangChain is a Python/JavaScript framework that helps you build applications around large language models (LLMs).

On its own, an LLM is “just” a model that receives text and produces text. But real projects need more than that:
- Load data from different sources (web pages, files, databases)
- Split long text into chunks
- Create embeddings
- Store and search vectors (FAISS, Chroma, etc.)
- Build a reliable question-answering workflow
- Add memory, tools, and custom prompts

LangChain provides building blocks for these steps, so you don’t have to glue everything together from scratch. In many projects, LangChain is the “pipeline manager” that connects data → retrieval → LLM → final answer.

LangChain یک فریم‌ورک برای پایتون و جاوااسکریپت است که کمک می‌کند دور و بر مدل‌های زبانی (LLM) یک سیستم واقعی بسازیم.

خودِ LLM به تنهایی فقط متن می‌گیرد و متن تولید می‌کند. ولی توی پروژه‌های واقعی معمولاً این کارها هم لازم است:
- خواندن داده از منابع مختلف (وب‌سایت، فایل، دیتابیس و …)
- خرد کردن متن‌های طولانی به chunk
- ساخت embedding
- ذخیره و جست‌وجوی برداری (مثل FAISS یا Chroma)
- ساختن یک جریانِ قابل اعتماد برای پرسش‌وپاسخ
- اضافه کردن حافظه، ابزارها و promptهای مخصوص

LangChain یک سری قطعه آماده برای همین کارها می‌دهد تا مجبور نباشیم همه‌چیز را از صفر به هم وصل کنیم. در خیلی از پروژه‌ها، LangChain نقش «مدیر خط لوله» را دارد که داده را می‌گیرد، retrieval انجام می‌دهد، به LLM می‌دهد و جواب نهایی را تولید می‌کند.

## 3) How Semantic Search becomes RAG

Semantic search is great for *finding* relevant text, but it doesn’t automatically produce a friendly, complete answer. This is where **RAG** comes in.

**RAG** stands for **Retrieval-Augmented Generation**:
- **Retrieval**: fetch the most relevant chunks from your documents (using semantic search)
- **Generation**: give those chunks to an LLM so it can write a final answer based on them

This approach is popular because it:
- Lets the chatbot answer using your own data (your website pages, your documents, etc.)
- Reduces hallucination (because the model is guided by retrieved text)
- Makes it easier to update knowledge (update the index, not the model)

A simple RAG flow looks like this:
1) You ask a question.
2) The system embeds the question.
3) It retrieves the top-k most similar chunks from the vector index.
4) It sends the question + retrieved chunks to the LLM in a prompt.
5) The LLM generates an answer grounded in those chunks.

Semantic search برای پیدا کردن متن‌های مرتبط عالی است، ولی خودش به تنهایی یک جواب کامل و خوش‌خوان تولید نمی‌کند. اینجاست که **RAG** وارد می‌شود.

RAG مخفف **Retrieval-Augmented Generation** است، یعنی:
- **Retrieval**: با semantic search نزدیک‌ترین chunkها را از بین داده‌ها پیدا کنیم
- **Generation**: همان chunkها را به LLM بدهیم تا بر اساس آن‌ها جواب نهایی را بنویسد

این روش محبوب است چون:
- چت‌بات می‌تواند از داده‌های خودتان جواب بدهد (صفحات سایت، فایل‌ها، مستندات و …)
- احتمال جواب‌های ساختگی کمتر می‌شود (چون مدل روی متن‌های بازیابی‌شده تکیه می‌کند)
- برای آپدیت دانش لازم نیست مدل را دوباره آموزش بدهید؛ کافی است دیتای جدید را index کنید

یک جریان ساده RAG معمولاً این شکلی است:
1) شما سؤال می‌پرسید.
2) سیستم embedding سؤال را می‌سازد.
3) از روی vector index نزدیک‌ترین chunkها را برمی‌گرداند.
4) سؤال + chunkهای برگردانده‌شده داخل prompt به LLM داده می‌شود.
5) LLM یک جواب نهایی می‌سازد که به همان chunkها تکیه دارد.

## 4) Project

In this project, we built a semantic search + RAG chatbot for a website:
- We give the system a list of website URLs.
- It downloads the pages, extracts text, and cleans it.
- It splits the text into chunks.
- It creates embeddings for each chunk.
- It stores the embeddings in **FAISS** (a fast similarity-search index).
- At chat time, a user asks a question; we retrieve the most relevant chunks from FAISS.
- Those chunks are sent to the LLM (connected through **n8n**) to generate the final answer.

توی این پروژه یک چت‌بات ساختیم که پشتش semantic search و RAG قرار دارد:
- به سیستم یک سری URL از سایت می‌دهیم.
- صفحات دانلود می‌شود، متن استخراج و تمیز می‌شود.
- متن به chunkهای کوچک‌تر تقسیم می‌شود.
- برای هر chunk embedding ساخته می‌شود.
- embeddingها داخل **FAISS** ذخیره می‌شود (برای جست‌وجوی سریع شباهت).
- موقع چت، کاربر سؤال می‌پرسد؛ سیستم از FAISS نزدیک‌ترین chunkها را برمی‌گرداند.
- بعد chunkها از طریق **n8n** به LLM داده می‌شود تا جواب نهایی ساخته شود.

## 5) File: `Server-ingest.py` (Building the Vector Database from URLs)

This file is the “data ingestion” part of the project. In simple terms, it takes a list of website URLs, turns their content into embeddings, and saves a FAISS index on disk.  
After this step is done, the chatbot (or any search script) can load that FAISS folder and retrieve relevant chunks quickly.

Here is the code structure (short and direct):

``` Python Code

from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

def main():
    urls = [ ... ]  # list of website pages

    loader = WebBaseLoader(urls)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=700, chunk_overlap=100)
    split_docs = splitter.split_documents(docs)

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    vs = FAISS.from_documents(split_docs, embeddings)
    vs.save_local("/root/knowledge/visup-faiss")

if __name__ == "__main__":
    main()
    
```

What happens step-by-step:
1) *URLs list*: You define the exact pages you want the bot to know about (in `urls = [...]`).
2) *Load web pages* (`WebBaseLoader`): LangChain fetches each URL and returns a list of `Document` objects.  
   Each `Document` usually includes:
   - `page_content`: the extracted text
   - `metadata`: useful info like source URL
3) *Chunking* (`RecursiveCharacterTextSplitter`): Each page is split into smaller parts.
   - `chunk_size=700` means each chunk is about 700 characters (roughly).
   - `chunk_overlap=100` repeats 100 characters between chunks so the meaning doesn’t “break” at chunk boundaries.
4) *Embeddings* (`HuggingFaceEmbeddings`): For every chunk, an embedding vector is created using  
   `sentence-transformers/all-MiniLM-L6-v2` (a popular lightweight embedding model).
5) *Vector store* (`FAISS.from_documents`): FAISS builds an index from those vectors so similarity search becomes fast.
6) *Save to disk* (`save_local(...)`): The index is saved into a folder so it can be reused later without re-downloading pages.


فایل `Server-ingest.py` قسمت «آماده‌سازی داده‌ها» (Ingestion) است. خیلی ساده بگم: یک لیست URL می‌گیرد، محتوای صفحات را می‌خواند، به chunk تبدیل می‌کند، برای هر chunk embedding می‌سازد و در نهایت یک ایندکس **FAISS** روی دیسک ذخیره می‌کند.  
بعد از اینکه این مرحله انجام شد، چت‌بات (یا هر اسکریپت جست‌وجو) می‌تواند همان پوشه‌ی FAISS را لود کند و خیلی سریع متن‌های مرتبط را پیدا کند.

ساختار کلی کد همین چند بخش است:
1) *لیست URLها*: دقیقاً مشخص می‌کنید چت‌بات قرار است روی کدام صفحه‌ها دانش داشته باشد.
2) *خواندن صفحات* با `WebBaseLoader`: لانگ‌چین هر URL را دریافت می‌کند و خروجی را به صورت لیستی از `Document` برمی‌گرداند.  
   هر `Document` معمولاً شامل این‌هاست:
   - `page_content`: متن استخراج‌شده
   - `metadata`: اطلاعات کمکی مثل آدرس صفحه
3) *تکه‌تکه کردن متن* با `RecursiveCharacterTextSplitter`: متن هر صفحه به قطعه‌های کوچک‌تر تقسیم می‌شود.
   - `chunk_size=700` یعنی هر chunk حدوداً 700 کاراکتر است (تقریبی).
   - `chunk_overlap=100` یعنی 100 کاراکتر از انتهای chunk قبلی ابتدای chunk بعدی هم می‌آید تا مفهوم وسط جمله‌ها قطع نشود.
4) *ساخت embedding* با `HuggingFaceEmbeddings`: برای هر chunk یک بردار عددی ساخته می‌شود با مدل  
   `sentence-transformers/all-MiniLM-L6-v2` (مدل سبک و رایج برای embedding).
5) *ساخت ایندکس برداری* با `FAISS.from_documents`: FAISS این بردارها را طوری سازمان‌دهی می‌کند که جست‌وجوی شباهت سریع شود.
6) *ذخیره روی دیسک* با `save_local(...)`: خروجی داخل یک پوشه ذخیره می‌شود تا دفعه‌های بعد لازم نباشد دوباره صفحات دانلود و embedding ساخته شود.



قدم بعدی این است که دقیقاً توضیح بدهیم توی همین فولدر، هر فایل چه کاری می‌کند و بعد هم اجرای مرحله‌به‌مرحله را بنویسیم (نصب، ساخت index، بالا آوردن برنامه، و تست چت‌بات).

## 6) Running on a server (SSH + Docker)

Sometimes it’s easier to run this project on a Linux server (VPS) instead of a personal laptop—especially when you want the bot to be “always on”.

The overall idea is simple:
1) Connect to the server with SSH  
2) Install Docker  
3) Start a Python container  
4) Install the project dependencies inside the container  
5) Copy/clone the code to the server  
6) Run the ingest script (build FAISS) and then run the app

Below is one practical workflow (Ubuntu/Debian style). You can adjust it based on your server OS.

**Step 1: SSH into the server**
```bash
ssh user@SERVER_IP
```

**Step 2: Install Docker**
If Docker is not installed yet, install it (there are multiple valid ways; this is the short/typical path):
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
```

**Step 3: Put the project on the server**
You can upload the folder with `scp`, or clone it with `git`. Example with `scp` (run this on your own PC):
```bash
scp -r ./langchain-semantic-search user@SERVER_IP:/opt/langchain-semantic-search
```

Then on the server:
```bash
cd /opt/langchain-semantic-search
```

**Step 4: Run a Python container and install requirements**
This starts a container and mounts your project folder into it:
```bash
sudo docker run --rm -it ^
  -v "$PWD:/app" ^
  -v "$PWD/vectorstore-local:/root/knowledge" ^
  -w /app ^
  --env-file .env ^
  python:3.11-slim bash
```

Inside the container:
```bash
pip install -r requirements.txt
```

**Step 5: Build the vector store (FAISS)**
Still inside the container:
```bash
python Server-ingest.py
```

After this, the FAISS files will be stored under the mounted folder (because we mounted it to `/root/knowledge`).

**Step 6: Run the app**
Depending on which app file you use:
```bash
python app-local.py
```
or
```bash
python app-noLLM.py
```

بعضی وقت‌ها اجرای پروژه روی یک سرور لینوکسی (VPS) خیلی راحت‌تر از لپ‌تاپ است، مخصوصاً وقتی می‌خواهید چت‌بات همیشه روشن باشد.

ایده کلی ساده است:
1) با SSH وارد سرور می‌شویم  
2) Docker نصب می‌کنیم  
3) یک کانتینر پایتون بالا می‌آوریم  
4) کتابخانه‌های پروژه را داخل کانتینر نصب می‌کنیم  
5) کدها را روی سرور می‌گذاریم (آپلود یا git)  
6) اول ingest را اجرا می‌کنیم (ساخت FAISS) و بعد اپ را اجرا می‌کنیم

این پایین یک روش کاربردی (برای Ubuntu/Debian) است. اگر سیستم‌عامل سرور فرق داشته باشد، فقط دستور نصب Docker فرق می‌کند.

**مرحله ۱: ورود به سرور با SSH**
```bash
ssh user@SERVER_IP
```

**مرحله ۲: نصب Docker**
اگر Docker نصب نیست، این یک روش کوتاه و رایج است:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
```

**مرحله ۳: انتقال پروژه به سرور**
می‌توانید با `scp` کل پوشه را آپلود کنید یا با `git` کلون کنید. نمونه با `scp` (این دستور را روی کامپیوتر خودتان بزنید):
```bash
scp -r ./langchain-semantic-search user@SERVER_IP:/opt/langchain-semantic-search
```

بعد روی سرور:
```bash
cd /opt/langchain-semantic-search
```

**مرحله ۴: اجرای کانتینر پایتون و نصب نیازمندی‌ها**
این دستور یک کانتینر بالا می‌آورد و پوشه پروژه را داخلش mount می‌کند:
```bash
sudo docker run --rm -it ^
  -v "$PWD:/app" ^
  -v "$PWD/vectorstore-local:/root/knowledge" ^
  -w /app ^
  --env-file .env ^
  python:3.11-slim bash
```

داخل کانتینر:
```bash
pip install -r requirements.txt
```

**مرحله ۵: ساخت دیتابیس برداری (FAISS)**
داخل همان کانتینر:
```bash
python Server-ingest.py
```

با توجه به mount که گذاشتیم، فایل‌های FAISS داخل پوشه‌ای که روی سرور گذاشتید ذخیره می‌شود (چون به `/root/knowledge` وصلش کردیم).

**مرحله ۶: اجرای برنامه**
بسته به اینکه کدام فایل را اجرا می‌کنید:
```bash
python app-local.py
```
یا
```bash
python app-noLLM.py
```

![Chunks](Chunks.png)

## 7) n8n (How we connect the chatbot to the LLM)

**n8n** is a workflow automation tool. You can think of it like a visual “pipeline builder” where you connect blocks together (nodes) to move data from one step to the next.

In our project, n8n is the glue between the chatbot and the LLM. Instead of writing all the API-calling logic inside the Python app, we create a workflow in n8n that:
1) Receives the user’s message (from the website/chat UI)
2) (Optionally) receives the retrieved context (the chunks we found from FAISS)
3) Sends everything to the LLM (for example: Gemini / OpenAI / any provider you set)
4) Returns the final answer back to the chatbot

So the chatbot becomes simpler: it focuses on retrieval and sending/receiving data, while n8n handles the “call the model and format the response” part.

What you usually build in n8n for this system:
- **A Trigger / Webhook node**: this is the entry point. Your app calls this URL with the user question (and maybe extra fields).
- **(Optional) Data formatting nodes**: set/merge fields, clean text, build the final prompt template.
- **An LLM node** (or HTTP request to an LLM API): this is where the model generates the answer.
- **A Response node**: sends the answer back to whoever called the webhook.

Where RAG fits in:
- The **retrieval** part (FAISS search) happens in Python.
- The **generation** part (LLM answering) happens in n8n.

That’s why, after you tested the system on the server, you can see a full “question → retrieval → LLM → answer” loop working end-to-end.

**n8n** یک ابزار اتوماسیون و ساختِ workflow است. خیلی ساده: یک محیط بصری که با وصل کردن چند «نود» (Node) به هم، یک جریان کاری می‌سازید تا داده از یک مرحله به مرحله بعد برود.

توی پروژه‌ی ما، n8n نقش واسطه بین چت‌بات و مدل زبانی (LLM) را دارد. یعنی به جای اینکه تمام کدهای مربوط به صدا زدن API مدل را داخل پایتون بنویسیم، یک workflow داخل n8n می‌سازیم که:
1) پیام کاربر را دریافت می‌کند (از سمت سایت/چت)
2) (اختیاری) کانتکست بازیابی‌شده را هم می‌گیرد (chunkهایی که از FAISS پیدا کردیم)
3) همه‌ی این‌ها را برای LLM می‌فرستد (مثلاً Gemini یا هر سرویس دیگری که تنظیم کرده‌اید)
4) جواب نهایی را برمی‌گرداند به چت‌بات

اینطوری کد چت‌بات ساده‌تر می‌شود: کارش این است که retrieval انجام بدهد و داده را بفرستد/تحویل بگیرد؛ و n8n کار «ساخت prompt، صدا زدن مدل، و برگرداندن پاسخ» را انجام می‌دهد.

معمولاً برای این سیستم داخل n8n این چیزها را می‌سازیم:
- **Webhook/Trigger**: نقطه ورود کار؛ اپ شما این URL را صدا می‌زند و سؤال کاربر را می‌فرستد.
- **نودهای آماده‌سازی داده** (اختیاری): مرتب کردن فیلدها، تمیز کردن متن، ساخت قالب prompt.
- **نود LLM** (یا HTTP Request به API مدل): جایی که مدل جواب را تولید می‌کند.
- **Response**: جواب را به درخواست‌کننده برمی‌گرداند.

جای RAG در این داستان:
- بخش **Retrieval** (جست‌وجوی FAISS) داخل پایتون انجام می‌شود.
- بخش **Generation** (جواب دادن با LLM) داخل n8n انجام می‌شود.

به همین خاطر وقتی روی سرور تست می‌گیرید، یک حلقه کامل «سؤال → retrieval → مدل → جواب» را به صورت end-to-end می‌بینید.

## 8) The exact n8n workflow we built (node-by-node)

In this project, our n8n workflow is a straight line with a few simple nodes:

![n8n](<N8N Workflow-1.png>)

1) **Webhook (entry point)**  
   This is the URL that our website/chatbot calls. We send something like:
   - `message`: the user question (text)

   ![n8n1](n8n1-1.png)

2) **HTTP Request (call the semantic-search API)**  
   This node calls our Python service endpoint (the one that searches FAISS).  
   We send JSON like:
   - `query`: the user message
   - `k`: how many top results we want (for example `4`)
   
   The response is usually a list of results (chunks), something like:
   - `results`: `[ { content: \"...\", source: \"...\" }, ... ]`

   ![n8n2](n8n2-1.png)

3) **Code (make a clean “context” text)**  
   The search results are useful but a bit raw. In the Code node, we convert them into one readable block of text:
   - take `results`
   - join them into a single `context` string (Source 1, Source 2, …)

   ![n8n3](n8n3-1.png)

4) **Message a model (LLM)**  
   Here we call the LLM (in our case, OpenAI).  
   The prompt is basically:
   - a short system instruction (role)
   - `Context: ...` (the context we built from retrieval)
   - `Question: ...` (the user message)

   ![n8n4](n8n4-1.png)

5) **Set Text (clean output field)**  
   This node just picks the final text we want to return (usually the model’s `message.content`) and puts it into a clean field like `answer`.

   ![n8n5](n8n5-1.png)

6) **Respond to Webhook (final output)**  
   This returns JSON back to the caller (the chatbot/website), for example:
   - `{ \"answer\": \"...\" }`

   ![n8n6](n8n6-1.png)

a clear RAG pipeline where Python does retrieval and n8n handles the LLM call + response formatting.

توی این پروژه workflow ما داخل n8n خیلی ساده و خطی است و چندتا نود پشت سر هم دارد:

1) **Webhook (ورودی کار)**  
   این همان URL است که سایت/چت‌بات صدا می‌زند. معمولاً یک چیزی مثل این می‌فرستیم:
   - `message`: متن سؤال کاربر

2) **HTTP Request (صدا زدن API سرچ)**  
   این نود به سرویس پایتونی ما درخواست می‌زند (همان جایی که FAISS را سرچ می‌کند).  
   داخل بدنه‌ی JSON معمولاً این‌ها را می‌فرستیم:
   - `query`: همان پیام کاربر
   - `k`: تعداد نتیجه‌هایی که می‌خواهیم (مثلاً `4`)
   
   خروجی‌اش هم معمولاً یک لیست از chunkهای پیدا شده است، مثلاً:
   - `results`: `[ { content: \"...\", source: \"...\" }, ... ]`

3) **Code (تبدیل نتایج به یک متن تمیز به اسم Context)**  
   نتیجه‌های سرچ به درد می‌خورند ولی خام هستند. توی این نود با یک کد کوتاه:
   - `results` را می‌گیریم
   - همه را کنار هم می‌چینیم و یک `context` خوش‌خوان درست می‌کنیم (Source 1, Source 2, …)

4) **Message a model (مدل زبانی / LLM)**  
   اینجا مدل را صدا می‌زنیم.  
   عملاً توی prompt این چیزها را می‌گذاریم:
   - یک دستور کلی (system/role)
   - `Context:` متن‌هایی که از سرچ گرفتیم
   - `Question:` سؤال کاربر

5) **Set Text (مرتب کردن خروجی)**  
   این نود خروجی مدل را برمی‌دارد (معمولاً `message.content`) و توی یک فیلد تمیز مثل `answer` می‌گذارد.

6) **Respond to Webhook (برگرداندن پاسخ به سایت)**  
   در آخر پاسخ را به شکل JSON برمی‌گردانیم تا چت‌بات روی سایت نشان بدهد، مثلاً:
   - `{ \"answer\": \"...\" }`

 خیلی تمیز و رو به جلو. retrieval با پایتون/FAISS انجام می‌شود و n8n کار صدا زدن مدل و برگرداندن جواب نهایی را انجام می‌دهد.

## 9) Final server test (run the service + ask the chatbot)

At the end, we do a quick real test on the server to make sure the backend is running and the chatbot can get answers.

**Run these commands on the server:**
```bash
cd /root/kb-service
source .venv/bin/activate
uvicorn app:app --host 0.0.0.0 --port 8089
```
![Server](Server-1.jpg)

When the service is up, we open the website chatbot, ask a question, and we should receive a correct answer back.

در آخر یک تست واقعی روی سرور می‌گیریم تا مطمئن شویم سرویس بالا است و چت‌بات می‌تواند جواب بگیرد.

**روی سرور این دستورها را می‌زنیم تا سیستم ران شود:**
```bash
cd /root/kb-service
source .venv/bin/activate
uvicorn app:app --host 0.0.0.0 --port 8089
```

بعد از اینکه سرویس بالا آمد، داخل چت‌بات سایت سؤال می‌پرسیم و باید جواب را دریافت کنیم.

![Succeed](<Succeeded WorkFlow-1.png>)
![Succeed1](<Succeeded WorkFlow 1-1.png>)