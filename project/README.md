# AI Chat Application

A React frontend with a Python Flask backend for AI-powered conversations with different modes and roast levels.

## Setup Instructions

### Backend Setup (Python Flask)

1. **Navigate to the project directory:**
   ```bash
   cd "c:\Users\nobit\Downloads\convince\project"
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # On Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   
   # On Windows (Command Prompt)
   .\venv\Scripts\activate.bat
   ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   - Copy `backend\.env.example` to `backend\.env`
   - Add your OpenAI API key to the `.env` file:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

6. **Run the Flask backend:**
   ```bash
   cd backend
   python app.py
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup (React + Vite)

1. **Open a new terminal/PowerShell window**

2. **Navigate to the project directory:**
   ```bash
   cd "c:\Users\nobit\Downloads\convince\project"
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Usage

1. **Start the backend first** (Flask server on port 5000)
2. **Then start the frontend** (Vite dev server on port 5173)
3. **Open your browser** to `http://localhost:5173`
4. **Choose your chat mode:**
   - **Convince AI**: Try to convince the AI of something
   - **Roast AI**: Get roasted by the AI (adjust roast level 1-10)
   - **Normal Chat**: Regular conversation
5. **Start chatting!**

## API Endpoints

### Backend (Flask)

- `GET /api/health` - Health check endpoint
- `POST /api/chat` - Send messages to the AI
  ```json
  {
    "messages": [{"role": "user", "content": "Hello!"}],
    "mode": "convince-ai",
    "roastLevel": 5
  }
  ```

## Troubleshooting

- **Backend not connecting**: Make sure the Flask server is running on port 5000
- **OpenAI errors**: Check that your API key is correctly set in `backend\.env`
- **CORS issues**: The backend includes CORS headers for frontend communication
- **Port conflicts**: Change ports in the respective config files if needed

## Project Structure

```
project/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── .env.example        # Environment variables template
│   └── .env               # Your environment variables (create this)
├── src/
│   ├── services/
│   │   └── openai.ts      # Backend API service
│   ├── hooks/
│   │   └── useChat.ts     # Chat logic hook
│   └── components/        # React components
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
└── README.md             # This file
```
