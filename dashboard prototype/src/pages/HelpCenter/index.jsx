export default function HelpCenter() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Help Center</h1>
      <p className="text-gray-500 mb-4">Kalau ada masalah, hubungi PT SCUI Indosat.</p>

      <div className="space-y-2">
        <a href="/help-center/faq" className="text-green-600 hover:underline">
          FAQ
        </a>
        <a href="/help-center/contact" className="text-green-600 hover:underline">
          Contact Support
        </a>
      </div>
    </div>
  );
}
