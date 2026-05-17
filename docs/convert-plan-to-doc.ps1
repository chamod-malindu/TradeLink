# Converts TradeLink-Complete-Plan.md to .docx and .pdf using Microsoft Word (if installed).
# Run from project root:  powershell -ExecutionPolicy Bypass -File docs/convert-plan-to-doc.ps1

$ErrorActionPreference = 'Stop'
$docsDir = $PSScriptRoot
$mdPath = Join-Path $docsDir 'TradeLink-Complete-Plan.md'
$docxPath = Join-Path $docsDir 'TradeLink-Complete-Plan.docx'
$pdfPath = Join-Path $docsDir 'TradeLink-Complete-Plan.pdf'

if (-not (Test-Path $mdPath)) {
  Write-Error "Not found: $mdPath"
}

try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $doc = $word.Documents.Open($mdPath)

  # wdFormatDocumentDefault = 16 (.docx), wdFormatPDF = 17
  $doc.SaveAs([ref]$docxPath, 16)
  Write-Host "Created: $docxPath"

  $doc.SaveAs([ref]$pdfPath, 17)
  Write-Host "Created: $pdfPath"

  $doc.Close()
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
  Write-Host "Done."
} catch {
  Write-Host "Microsoft Word conversion failed: $_"
  Write-Host ""
  Write-Host "Manual options:"
  Write-Host "  1. Open docs/TradeLink-Complete-Plan.md in Word -> File -> Save As -> .docx or PDF"
  Write-Host "  2. Upload the .md file to Google Docs -> File -> Download -> PDF"
  Write-Host "  3. In VS Code: install 'Markdown PDF' extension -> right-click .md -> Markdown PDF: Export"
}
