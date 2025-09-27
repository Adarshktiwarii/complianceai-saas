# ComplianceAI - Free AI APIs Setup Guide

## 🆓 **Free AI APIs Available**

Your ComplianceAI now supports multiple free AI APIs! Here's how to set them up:

---

## 🔍 **1. Perplexity AI (Recommended - Best Quality)**

### **Why Perplexity?**
- **Real-time Information**: Access to current data and news
- **High Quality**: Comparable to ChatGPT
- **Free Tier**: Available for developers
- **Legal Expertise**: Great for legal and compliance questions

### **Setup Steps:**
1. **Sign up**: Go to [Perplexity AI Developer](https://www.perplexity.ai/developer-api)
2. **Get API Key**: Create account and get your free API key
3. **Add to Environment**: Add to your `.env.local` file:

```bash
# Add this to your .env.local file
PERPLEXITY_API_KEY="pplx-your-actual-api-key-here"
```

### **Models Available:**
- `llama-3.1-sonar-small-128k-online` (Free tier)
- `llama-3.1-sonar-large-128k-online` (Pro tier)

---

## 🤗 **2. Hugging Face (Free - Multiple Models)**

### **Why Hugging Face?**
- **Completely Free**: No API costs
- **Multiple Models**: Try different AI models
- **Open Source**: Transparent and reliable
- **Good Quality**: Decent responses for legal questions

### **Setup Steps:**
1. **Sign up**: Go to [Hugging Face](https://huggingface.co/)
2. **Get Token**: Create access token in your profile
3. **Add to Environment**: Add to your `.env.local` file:

```bash
# Add this to your .env.local file
HUGGINGFACE_API_KEY="hf_your-actual-token-here"
```

### **Models We Use:**
- `microsoft/DialoGPT-large` (Best for conversations)
- `microsoft/DialoGPT-medium` (Good balance)
- `facebook/blenderbot-400M-distill` (Fast responses)
- `google/flan-t5-large` (Good for Q&A)

---

## 🚀 **3. OpenAI (Premium - Best Quality)**

### **Why OpenAI?**
- **Highest Quality**: GPT-4 is the best available
- **Reliable**: Most consistent responses
- **Legal Expertise**: Excellent for legal questions
- **Cost**: Requires paid API key

### **Setup Steps:**
1. **Sign up**: Go to [OpenAI Platform](https://platform.openai.com/)
2. **Get API Key**: Create API key in your dashboard
3. **Add Credits**: Add payment method for API usage
4. **Add to Environment**: Add to your `.env.local` file:

```bash
# Add this to your .env.local file
OPENAI_API_KEY="sk-proj-your-actual-api-key-here"
```

---

## 🔧 **How to Set Up**

### **Step 1: Get API Keys**
1. **Perplexity**: Sign up at [perplexity.ai/developer-api](https://www.perplexity.ai/developer-api)
2. **Hugging Face**: Sign up at [huggingface.co](https://huggingface.co/)
3. **OpenAI** (Optional): Sign up at [platform.openai.com](https://platform.openai.com/)

### **Step 2: Update Environment File**
Add these to your `.env.local` file:

```bash
# AI APIs - Add your actual keys here
OPENAI_API_KEY="sk-proj-your-openai-key-here"
PERPLEXITY_API_KEY="pplx-your-perplexity-key-here"
HUGGINGFACE_API_KEY="hf_your-huggingface-token-here"
```

### **Step 3: Restart Application**
```bash
# Stop the current server (Ctrl+C)
# Then restart
cd /Users/adarsh/complianceai-saas
npm run dev
```

---

## 🎯 **AI Priority Order**

The AI Assistant tries APIs in this order:

1. **OpenAI GPT-4** (If API key is available)
2. **Perplexity AI** (If API key is available)
3. **Hugging Face** (If API key is available)
4. **Rule-based Fallback** (Always works)

---

## 📊 **API Comparison**

| API | Quality | Cost | Speed | Legal Expertise |
|-----|---------|------|-------|----------------|
| **OpenAI GPT-4** | ⭐⭐⭐⭐⭐ | 💰 Paid | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Perplexity AI** | ⭐⭐⭐⭐⭐ | 🆓 Free | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Hugging Face** | ⭐⭐⭐ | 🆓 Free | ⭐⭐⭐ | ⭐⭐⭐ |
| **Rule-based** | ⭐⭐ | 🆓 Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🚀 **Quick Setup (Recommended)**

### **For Best Free Experience:**
1. **Get Perplexity API Key** (5 minutes)
2. **Add to .env.local**:
   ```bash
   PERPLEXITY_API_KEY="pplx-your-key-here"
   ```
3. **Restart application**
4. **Test AI Assistant** at http://localhost:3000/assistant

### **For Completely Free Experience:**
1. **Get Hugging Face Token** (2 minutes)
2. **Add to .env.local**:
   ```bash
   HUGGINGFACE_API_KEY="hf_your-token-here"
   ```
3. **Restart application**
4. **Test AI Assistant** at http://localhost:3000/assistant

---

## 🎉 **Current Status**

### **✅ What's Working Now:**
- **Rule-based AI**: Always works (no API keys needed)
- **Hugging Face**: Free models available
- **Perplexity**: Free tier available
- **OpenAI**: Premium option available

### **✅ AI Sources Available:**
- **🤖 OpenAI GPT-4**: Premium AI (requires API key)
- **🔍 Perplexity AI**: Free tier with real-time data
- **🤗 Hugging Face**: Multiple free models
- **🆓 Rule-based**: Always works offline

---

## 🧪 **Testing Your Setup**

### **Test Commands:**
```bash
# Test the AI Assistant
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What documents do I need for GST registration?"}'
```

### **Expected Response:**
```json
{
  "success": true,
  "response": "For GST registration in India...",
  "suggestions": ["How to file GSTR-1?", "What is the GST rate?"],
  "source": "perplexity" // or "huggingface" or "fallback"
}
```

---

## 🎯 **Recommendations**

### **For Development:**
- **Use Perplexity**: Best free option with high quality
- **Add Hugging Face**: Backup for when Perplexity is down
- **Keep Rule-based**: Always works as fallback

### **For Production:**
- **Use OpenAI**: Best quality for production
- **Add Perplexity**: Backup with real-time data
- **Add Hugging Face**: Free backup option

---

## 🚀 **Next Steps**

1. **Get Perplexity API Key** (Recommended)
2. **Test AI Assistant** at http://localhost:3000/assistant
3. **Ask legal questions** and see real AI responses
4. **Enjoy ChatGPT-like experience** with legal expertise!

---

**🎉 Your ComplianceAI now has multiple free AI options that work like ChatGPT!**

**📱 Test it at: http://localhost:3000/assistant**
