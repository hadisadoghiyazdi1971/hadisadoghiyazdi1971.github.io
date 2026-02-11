# ایجاد فایل fix_py313.sh
cat > fix_py313.sh << 'EOF'
#!/bin/bash
echo "🔧 رفع مشکل Python 3.13..."

# ۱. نصب پکیج‌های سازگار
echo "📦 نصب پکیج‌های سازگار..."
pip install --upgrade pip
pip install streamlit==1.28.0
pip install langchain-core==0.1.0 langchain-community==0.0.20
pip install chromadb==0.4.22
pip install sentence-transformers==2.2.2
pip install PyMuPDF4LLM==0.1.4
pip install hazm==0.9.0

# ۲. اصلاح persian_retriever.py
echo "✏️ اصلاح persian_retriever.py..."
cat > src/multimodal_retriever/persian_retriever.py << 'PYEOF'
# محتوای کد بالا (نسخه بدون Pydantic) را اینجا قرار دهید
PYEOF

# ۳. اصلاح app.py برای استفاده از PersianRetriever
echo "✏️ اصلاح app.py..."
# در app.py، import را تغییر دهید:
# از: from src.multimodal_retriever.persian_retriever import PersianMultimodalRetriever
# به: from src.multimodal_retriever.persian_retriever import PersianRetriever

echo "✅ تکمیل شد! حالا streamlit را اجرا کنید..."
EOF

chmod +x fix_py313.sh
./fix_py313.sh
