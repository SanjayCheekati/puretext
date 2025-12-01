# 🔒 Puretext

**Your secure, encrypted notepad in the cloud.**

Puretext is a privacy-first note-taking app that keeps your thoughts, ideas, and sensitive information completely secure. With military-grade encryption happening right in your browser, your data stays yours - always.

---

## 🎯 Why Puretext?

### For Students
- 📚 **Study Notes**: Keep lecture notes, research, and study materials organized and accessible from any device
- 🔐 **Exam Prep**: Store practice questions and answers securely
- 📝 **Project Ideas**: Brainstorm and organize your assignments without worrying about data leaks
- 💡 **Quick Access**: Get to your notes from school, library, or home using simple URLs

### For Professionals
- 🗂️ **Meeting Notes**: Capture important discussions and action items
- 💼 **Project Planning**: Organize tasks, deadlines, and project details
- 📊 **Client Information**: Store sensitive client data with confidence
- 🚀 **Ideas & Brainstorming**: Keep your innovative ideas secure and accessible

### For Everyone
- 🔑 **Passwords & Keys**: Safely store API keys, passwords, and sensitive credentials
- 📋 **To-Do Lists**: Manage your daily tasks and reminders
- 💭 **Personal Journal**: Write freely knowing your thoughts are completely private
- 🌍 **Anywhere Access**: Your notes follow you - just remember your note name

---

## ✨ What Makes It Special

### 🛡️ **Military-Grade Security**
Your notes are encrypted with **AES-256**, the same encryption standard used by governments and banks. Even we can't read your notes - only you can.

### 🔓 **Zero-Knowledge Architecture**
Your password never leaves your device. All encryption happens in your browser before data reaches our servers. We literally cannot access your data even if we wanted to.

### 🎨 **Simple & Beautiful**
No complicated setup. Just enter a note name and start typing. Clean, distraction-free interface helps you focus on what matters.

### 💾 **Save When You Want**
Unlike auto-save apps that might save incomplete thoughts, you control when to save. A friendly save button appears only when you have changes.

### 📑 **Organize with Tabs**
Keep related information together with multiple tabs in each note. Perfect for projects with different sections.

### 🌐 **Works Everywhere**
Access your notes from any device with a web browser. No apps to install, no storage limits to worry about.

---

## 🎓 Perfect For

- **Students** preparing for exams or working on group projects
- **Developers** storing code snippets and API keys
- **Writers** drafting articles and creative content
- **Business Professionals** managing sensitive client information
- **Anyone** who values privacy and security

---

## 🚀 How It Works

1. **Enter a note name** - Like "my-study-notes" or "project-ideas"
2. **Start typing** - Your note is created instantly
3. **Add a password** - Optional, for extra security
4. **Save when ready** - Click the save button when you're done
5. **Access anywhere** - Just visit the same URL from any device

That's it! No registration, no email verification, no complicated setup.

---

## 🔐 Privacy Promise

- ✅ **Your data is encrypted** before it leaves your browser
- ✅ **We never see your passwords** - they stay on your device
- ✅ **We never see your notes** - only encrypted gibberish reaches our servers
- ✅ **No tracking, no analytics** - we don't collect personal information
- ✅ **No ads, no spam** - we respect your privacy

---

## 💡 Use Cases

**Students:**
- Class notes organized by subject
- Study guides for finals
- Research paper drafts
- Group project collaboration notes

**Professionals:**
- Client meeting notes
- Project specifications
- API credentials and tokens
- Business ideas and strategies

**Personal:**
- Daily journal entries
- Recipe collections
- Travel planning
- Gift ideas and shopping lists

---

## 🌟 Key Features

- **Custom URLs** - Access notes like `puretext.com/my-note`
- **Password Protection** - Lock sensitive notes with encryption
- **Multiple Tabs** - Organize content within each note
- **Manual Save** - Save only when you're ready
- **Mobile Friendly** - Works perfectly on phones and tablets
- **No Limits** - Create unlimited notes
- **Fast & Reliable** - Powered by MongoDB Atlas cloud infrastructure

---

## 🔒 Security You Can Trust

**Encryption Standard**: AES-256-GCM (Advanced Encryption Standard)  
**Key Derivation**: PBKDF2 with 100,000 iterations  
**Protocol**: Zero-knowledge encryption  
**Result**: Even if our servers are compromised, your data remains encrypted

If you forget your password, even we cannot recover your data. That's how secure it is.

---

## 📱 Start Using Puretext Today

No sign-up required. No credit card needed. Just visit Puretext and start writing.

**Your thoughts deserve privacy. Your data deserves security.**

---

*Built with privacy in mind, designed for everyone.*
This installs dependencies for root, backend, and frontend.

3. **Set up MongoDB**:
   - Make sure MongoDB is running locally on `mongodb://localhost:27017`
   - Or update the connection string in `backend/.env`

4. **Configure environment variables**:
   
   Edit `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/privatetext
   NODE_ENV=development
   ```

### Running the Application

**Development mode** (runs both backend and frontend):
```bash
npm run dev
```

**Or run separately**:

Backend:
```bash
npm run server
```

Frontend:
```bash
npm run client
```

**Access the application**:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 📖 Usage Guide

### Creating a Note

1. Visit `http://localhost:3000`
2. Enter a note name (e.g., "shopping-list")
3. Click "Open Note"
4. Start typing in the editor

### Password Protection

**Lock a note**:
1. Click the "🔓 Lock" button
2. Enter a password
3. The note is now encrypted

**Unlock a note**:
1. Visit the note URL
2. Enter the password when prompted
3. The note decrypts in your browser

**Change password**:
1. Click "🔒 Change Password"
2. Enter a new password
3. Note is re-encrypted with new password

### Working with Tabs

- **Add Tab**: Click "+ Add Tab"
- **Rename Tab**: Click the ✏️ icon on a tab
- **Delete Tab**: Click the ✕ icon (requires at least 2 tabs)
- **Switch Tab**: Click on any tab name

### Sharing Notes

1. Click "Share" button
2. URL is copied to clipboard
3. Share the URL with others
4. If password-protected, share password separately (via secure channel)

### Deleting Notes

1. Click "Delete" button
2. Confirm deletion
3. Note is permanently deleted

**Note**: Delete token is stored in localStorage. If you lose it, you cannot delete the note.

---

## 🔐 Security Details

### Encryption Process

1. User enters password
2. Random salt (16 bytes) is generated
3. Key is derived using PBKDF2 (100,000 iterations, SHA-256)
4. Random IV (12 bytes) is generated
5. Plaintext JSON is encrypted using AES-GCM
6. Salt + IV + Ciphertext are sent to server

### Decryption Process

1. Server sends encrypted data (salt, iv, ciphertext)
2. User enters password
3. Key is derived using same PBKDF2 process
4. Data is decrypted using AES-GCM
5. JSON is parsed back to note structure

### What the Server Never Sees

- ❌ Plaintext content
- ❌ User passwords
- ❌ Tab names
- ❌ Any unencrypted data

### What the Server Stores

- ✅ Encrypted ciphertext (Base64)
- ✅ Salt (Base64)
- ✅ IV (Base64)
- ✅ Delete token hash (SHA-256)

---

## 📁 Project Structure

```
privatetext/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Note.js            # Note schema
│   ├── routes/
│   │   └── notes.js           # API routes
│   ├── utils/
│   │   └── crypto.js          # Server-side crypto utilities
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express server
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── notes.ts       # API client
│   │   ├── components/
│   │   │   ├── Home.tsx       # Landing page
│   │   │   ├── NoteEditor.tsx # Main editor
│   │   │   ├── PasswordDialog.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── TextInputDialog.tsx
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript types
│   │   ├── utils/
│   │   │   ├── crypto.ts      # Client-side encryption
│   │   │   └── deleteToken.ts # Delete token management
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── package.json               # Root package.json
├── .gitignore
└── README.md
```

---

## 🛠️ API Documentation

### GET /api/note/:name

Fetch a note by name.

**Response**:
```json
{
  "exists": true,
  "data": {
    "version": 1,
    "salt": "<base64>",
    "iv": "<base64>",
    "ciphertext": "<base64>"
  },
  "createdAt": "2025-12-01T10:00:00.000Z",
  "updatedAt": "2025-12-01T10:05:00.000Z"
}
```

### POST /api/note/:name

Create or update a note.

**Request**:
```json
{
  "data": {
    "version": 1,
    "salt": "<base64>",
    "iv": "<base64>",
    "ciphertext": "<base64>"
  },
  "deleteTokenHash": "<sha256>" // Required for new notes
}
```

**Response**:
```json
{
  "success": true,
  "message": "Note created",
  "createdAt": "2025-12-01T10:00:00.000Z",
  "updatedAt": "2025-12-01T10:00:00.000Z"
}
```

### DELETE /api/note/:name

Delete a note.

**Request**:
```json
{
  "deleteToken": "<base64-token>"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create a new unlocked note
- [ ] Add/edit content and verify auto-save
- [ ] Add multiple tabs
- [ ] Rename tabs
- [ ] Delete tabs
- [ ] Lock note with password
- [ ] Reload page and unlock with password
- [ ] Change password
- [ ] Share URL and access from different browser
- [ ] Delete note
- [ ] Try accessing deleted note

---

## 🚨 Important Security Notes

1. **Lost Passwords = Lost Data**: If you forget your password, your data is **permanently inaccessible**. There is no password recovery.

2. **Delete Tokens**: Delete tokens are stored in browser localStorage. If you clear your browser data, you won't be able to delete the note from the server.

3. **HTTPS Required in Production**: Always use HTTPS in production to prevent man-in-the-middle attacks.

4. **Password Strength**: Use strong, unique passwords. The encryption is only as strong as your password.

---

## 🏭 Production Deployment

### Environment Variables

```env
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/privatetext
NODE_ENV=production
```

### Build Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`.

### Deploy Backend

1. Set environment variables
2. Run `node server.js` or use a process manager like PM2
3. Set up MongoDB (MongoDB Atlas recommended)

### Deploy Frontend

1. Serve the `frontend/dist/` directory
2. Configure routing to serve `index.html` for all routes
3. Use a CDN for better performance

---

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing style
- Security best practices are maintained
- Encryption logic is never modified without thorough review

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- Inspired by [ProtectedText.com](https://www.protectedtext.com)
- Built with modern web technologies
- Focused on privacy and security

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Review security guidelines

---

**Remember**: Your security is in your hands. Use strong passwords and never share them insecurely! 🔐
