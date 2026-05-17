# TradeLink documentation

## Project plan (PDF / Word)

| File | Purpose |
|------|---------|
| [TradeLink-Complete-Plan.md](./TradeLink-Complete-Plan.md) | Full step-by-step plan (FeedPulse-style) |
| [convert-plan-to-doc.ps1](./convert-plan-to-doc.ps1) | Auto-export to `.docx` and `.pdf` via Microsoft Word |

### Get PDF or DOC

**Option A — PowerShell (Windows + Word installed):**

```powershell
cd "E:\GitHub Projects\Assignment\TradeLink"
powershell -ExecutionPolicy Bypass -File docs\convert-plan-to-doc.ps1
```

Output: `docs/TradeLink-Complete-Plan.docx` and `docs/TradeLink-Complete-Plan.pdf`

**Option B — Manual:**

1. Open `TradeLink-Complete-Plan.md` in **Microsoft Word**
2. **File → Save As** → choose `.docx` or **PDF**

**Option C — Google Docs:**

1. Upload the `.md` file to Google Drive
2. Open with Google Docs → **File → Download → PDF**
