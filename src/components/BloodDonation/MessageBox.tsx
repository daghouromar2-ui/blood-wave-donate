const MessageBox = () => {
  return (
    <div 
      className="rounded-2xl p-4 mb-6 text-center"
      style={{
        background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
      }}
    >
      <p className="text-white text-sm leading-relaxed font-medium whitespace-pre-line" dir="rtl">
        نشكركم على مساهمتكم بإعطاء معلومات صحيحة. نسأل اللّٰه أن يضاعف لكم الأجر ويكتبها في ميزان حسناتكم إلى يوم القيامة ❤️{"\n"}
        {"{ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا }"}
      </p>
    </div>
  );
};

export default MessageBox;
