
const ID_ALIASES = {
  questionNumber: ["questionNumber", "qNumber", "counter"],
  quizTitle: ["quizTitle", "modeTitle"],
  questionText: ["questionText", "question"],
  difficulty: ["difficulty", "qCat", "diff"],
  scoreNow: ["scoreNow", "score"],
  answers: ["answers"],
  feedback: ["feedback", "answerMsg"],
  timeLeft: ["timeLeft", "timer"],
  timeBar: ["timeBar", "progress"],
  resultTitle: ["resultTitle"],
  resultText: ["resultText"],
  resultScore: ["resultScore"]
};

const $ = id => {
  const ids = ID_ALIASES[id] || [id];
  for (const name of ids) {
    const el = document.getElementById(name);
    if (el) return el;
  }
  return null;
};

const modes = {
  quiz: {name:"🧠 من يعرف أكثر؟", desc:"أسئلة معلومات عامة بثلاث درجات صعوبة.", time:15},
  speed:{name:"⚡ تحدي السرعة", desc:"أسئلة سريعة، والوقت القصير يزيد التحدي.", time:7},
  guess:{name:"🎯 خمنها", desc:"خمن الشيء أو الشخص أو المكان من التلميح.", time:15},
  imageguess:{name:"🖼️ خمن الصورة", desc:"شاهد منتجًا حقيقيًا واختر العلامة الصحيحة.", time:18},
  playerguess:{name:"⚽ خمن اللاعب", desc:"شاهد وجه اللاعب كاملًا واختر اسمه.", time:18},
  celebrityguess:{name:"🌟 خمن المشهور", desc:"شاهد صورة المشهور أو اليوتيوبر وخمّن من هو.", time:18},
  youtuberguess:{name:"▶️ خمن اليوتيوبر", desc:"شاهد صورة اليوتيوبر وخمّن من هو.", time:18},
  emoji:{name:"🎭 خمن بالإيموجي", desc:"فك رموز الإيموجي وخمّن الفيلم أو اللعبة أو الشخصية.", time:15},
  password:{name:"🔐 كلمة السر", desc:"اكتشف الكلمة المطلوبة من عدة تلميحات.", time:18},
  tf:{name:"صح أو خطأ", desc:"احكم على المعلومة: صحيحة أم خاطئة.", time:8},
  mixed:{name:"🧩 أسئلة متنوعة وعشوائية", desc:"مزيج عشوائي من جميع الألعاب.", time:15}
};

const questions = [
/* من يعرف أكثر */
{m:"quiz",d:"سهل",q:"ما عاصمة الجزائر؟",a:["الجزائر","وهران","قسنطينة","عنابة"],x:0},
{m:"quiz",d:"سهل",q:"ما الكوكب المعروف بالكوكب الأحمر؟",a:["المشتري","المريخ","الزهرة","عطارد"],x:1},
{m:"quiz",d:"سهل",q:"كم عدد أيام الأسبوع؟",a:["5","6","7","8"],x:2},
{m:"quiz",d:"سهل",q:"ما أكبر محيط في العالم؟",a:["الأطلسي","الهندي","الهادئ","المتجمد"],x:2},
{m:"quiz",d:"سهل",q:"كم عدد أرجل العنكبوت؟",a:["6","8","10","12"],x:1},
{m:"quiz",d:"سهل",q:"ما عاصمة مصر؟",a:["القاهرة","دمشق","الرباط","طرابلس"],x:0},
{m:"quiz",d:"سهل",q:"ما العضو الذي يضخ الدم؟",a:["الرئة","القلب","الكبد","المعدة"],x:1},
{m:"quiz",d:"سهل",q:"كم دقيقة في الساعة؟",a:["30","45","60","90"],x:2},
{m:"quiz",d:"سهل",q:"ما لون الزمرد؟",a:["أحمر","أزرق","أخضر","أصفر"],x:2},
{m:"quiz",d:"سهل",q:"ما الحيوان المعروف بسفينة الصحراء؟",a:["الجمل","الحصان","الفيل","الغزال"],x:0},
{m:"quiz",d:"متوسط",q:"ما عاصمة أستراليا؟",a:["سيدني","ملبورن","كانبيرا","بيرث"],x:2},
{m:"quiz",d:"متوسط",q:"ما الغاز الأكثر وفرة في الغلاف الجوي؟",a:["الأكسجين","النيتروجين","الهيدروجين","ثاني أكسيد الكربون"],x:1},
{m:"quiz",d:"متوسط",q:"من رسم الموناليزا؟",a:["بيكاسو","ليوناردو دا فينشي","فان غوخ","رامبرانت"],x:1},
{m:"quiz",d:"متوسط",q:"ما أصغر عدد أولي؟",a:["0","1","2","3"],x:2},
{m:"quiz",d:"متوسط",q:"ما وحدة شدة التيار الكهربائي؟",a:["فولت","واط","أمبير","أوم"],x:2},
{m:"quiz",d:"متوسط",q:"ما العملية التي تصنع بها النباتات غذاءها؟",a:["التنفس","البناء الضوئي","الهضم","التخمر"],x:1},
{m:"quiz",d:"متوسط",q:"ما أكبر دولة في العالم من حيث المساحة؟",a:["الصين","كندا","روسيا","البرازيل"],x:2},
{m:"quiz",d:"صعب",q:"ما العنصر الذي عدده الذري 79؟",a:["الفضة","الذهب","البلاتين","الزئبق"],x:1},
{m:"quiz",d:"صعب",q:"ما اسم مجرتنا؟",a:["أندروميدا","درب التبانة","المثلث","سومبريرو"],x:1},
{m:"quiz",d:"صعب",q:"من وضع قوانين الحركة الثلاثة؟",a:["نيوتن","أينشتاين","غاليليو","كبلر"],x:0},
{m:"quiz",d:"صعب",q:"ما أكبر قمر لكوكب زحل؟",a:["أوروبا","تيتان","غانيميد","تريتون"],x:1},
{m:"quiz",d:"صعب",q:"ما وحدة المقاومة الكهربائية؟",a:["أوم","أمبير","فولت","جول"],x:0},
{m:"quiz",d:"صعب",q:"ما أصغر عظمة في جسم الإنسان؟",a:["الركاب","الفخذ","الزند","القص"],x:0},

/* تحدي السرعة */
{m:"speed",d:"سهل",q:"⚡ بسرعة: 7 + 5 = ؟",a:["10","11","12","13"],x:2},
{m:"speed",d:"سهل",q:"⚡ بسرعة: ما عاصمة فرنسا؟",a:["مدريد","باريس","روما","برلين"],x:1},
{m:"speed",d:"سهل",q:"⚡ بسرعة: كم شهرًا في السنة؟",a:["10","11","12","13"],x:2},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: 12 × 4 = ؟",a:["36","48","52","44"],x:1},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: 100 ÷ 4 = ؟",a:["20","25","30","40"],x:1},
{m:"speed",d:"متوسط",q:"⚡ بسرعة: كم ضلعاً للمربع؟",a:["3","4","5","6"],x:1},
{m:"speed",d:"صعب",q:"⚡ بسرعة: 15² = ؟",a:["125","200","225","250"],x:2},
{m:"speed",d:"صعب",q:"⚡ بسرعة: ما عاصمة اليابان؟",a:["كيوتو","طوكيو","أوساكا","ناغويا"],x:1},
{m:"speed",d:"صعب",q:"⚡ بسرعة: 144 ÷ 12 = ؟",a:["10","11","12","13"],x:2},

/* خمنها */
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا بلد عربي عاصمتي الجزائر ولدي ساحل على البحر المتوسط.",a:["الجزائر","تونس","ليبيا","المغرب"],x:0},
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا الكوكب الأزرق الذي نعيش عليه.",a:["الأرض","المريخ","زحل","عطارد"],x:0},
{m:"guess",d:"سهل",q:"🎯 خمنها: أنا حيوان كبير أملك خرطوماً وأذنين كبيرتين.",a:["الزرافة","الفيل","وحيد القرن","الجمل"],x:1},
{m:"guess",d:"متوسط",q:"🎯 خمنها: عالم ارتبط بقوانين الحركة والجاذبية.",a:["نيوتن","داروين","باستور","أرسطو"],x:0},
{m:"guess",d:"متوسط",q:"🎯 خمنها: مدينة إيطالية مشهورة بالقنوات المائية.",a:["روما","ميلانو","البندقية","تورينو"],x:2},
{m:"guess",d:"متوسط",q:"🎯 خمنها: شركة صنعت PlayStation.",a:["Microsoft","Sony","Nintendo","Sega"],x:1},
{m:"guess",d:"صعب",q:"🎯 خمنها: حضارة قديمة اشتهرت بالكتابة المسمارية في بلاد الرافدين.",a:["السومريون","الإنكا","الفايكنغ","الإغريق"],x:0},
{m:"guess",d:"صعب",q:"🎯 خمنها: عالم وضع نظرية النسبية.",a:["نيوتن","أينشتاين","ماكسويل","داروين"],x:1},

/* خمن اللاعب — 30 سؤالاً بصور حقيقية، مع قص الجزء العلوي من الوجه */
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["ليونيل ميسي","كريستيانو رونالدو","نيمار","كيليان مبابي"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lionel_messi.jpg?width=1000",player:"ليونيل ميسي"},
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["كريستيانو رونالدو","ليونيل ميسي","كيليان مبابي","إيرلينغ هالاند"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Christiano_Ronaldo_at_world_cup_match_2026.jpg?width=1000",player:"كريستيانو رونالدو"},
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["كيليان مبابي","نيمار","ليونيل ميسي","كريم بنزيما"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kylian_Mbappe_-_France_v_Senegal_-_16_June_2026.jpg?width=1000",player:"كيليان مبابي"},
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["إيرلينغ هالاند","هاري كين","كيليان مبابي","جود بيلينغهام"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Erling_Haaland_June_2025.jpg?width=1000",player:"إيرلينغ هالاند"},
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["نيمار","رودريغو","فينيسيوس جونيور","رافينيا"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_%2816245492137%29_%28cropped%29.jpg?width=1000",player:"نيمار"},
{m:"playerguess",d:"سهل",q:"من هذا اللاعب؟",a:["كريم بنزيما","محمد صلاح","رياض محرز","روبرت ليفاندوفسكي"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Karim_Benzema_2021.jpg?width=1000",player:"كريم بنزيما"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["روبرت ليفاندوفسكي","كريم بنزيما","هاري كين","لويس سواريز"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Robert_Lewandowski_%282011%29.jpg?width=1000",player:"روبرت ليفاندوفسكي"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["كيفن دي بروين","لوكا مودريتش","توني كروس","برونو فيرنانديز"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kevin_de_Bruyne_2016-12-26_%28cropped%29.jpg?width=1000",player:"كيفن دي بروين"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["فينيسيوس جونيور","رودريغو","نيمار","رافينيا"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Vinicius_Junior_%282025%29.jpg?width=1000",player:"فينيسيوس جونيور"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["لامين يامال","بيدري","جافي","أنسو فاتي"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lamine_Yamal_%282025%29.png?width=1000",player:"لامين يامال"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["جود بيلينغهام","بوكايو ساكا","فيل فودين","كول بالمر"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Jude_Bellingham_England_v_Panama_27_June_26-160_%28cropped%29.jpg?width=1000",player:"جود بيلينغهام"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["محمد صلاح","ساديو ماني","رياض محرز","سون هيونغ مين"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mohamed_Salah_Argentina_v_Egypt_7_July_2026-163_%28cropped%29.jpg?width=1000",player:"محمد صلاح"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["لوكا مودريتش","إيفان راكيتيتش","ماتيو كوفاسيتش","توني كروس"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Luka_Modric.jpg?width=1000",player:"لوكا مودريتش"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["بيدري","جافي","لامين يامال","داني أولمو"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pedri.jpg?width=1000",player:"بيدري"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["بوكايو ساكا","ماركوس راشفورد","جود بيلينغهام","رحيم ستيرلينغ"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Bukayo_Saka.jpg?width=1000",player:"بوكايو ساكا"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["ليونيل ميسي","أنخيل دي ماريا","لاوتارو مارتينيز","أليخاندرو غارناتشو"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lionel_Messi.jpg?width=1000",player:"ليونيل ميسي"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["كريستيانو رونالدو","برناردو سيلفا","جواو فيليكس","رافائيل لياو"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Cristiano_Ronaldo_0889.jpg?width=1000",player:"كريستيانو رونالدو"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["كيليان مبابي","عثمان ديمبيلي","أنطوان غريزمان","أوليفييه جيرو"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kylian_Mbappe_France_v_Morocco_9_July_2026-148.jpg?width=1000",player:"كيليان مبابي"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["إيرلينغ هالاند","ألكسندر سورلوث","مارتن أوديغارد","جوشوا كينغ"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Erling_Haaland_Morocco_v_Norway_7_June_2026-128.jpg?width=1000",player:"إيرلينغ هالاند"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["نيمار","رودريغو","فينيسيوس جونيور","رافينيا"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_-_Santos_vs_Juventude_-_04-08-2025.jpg?width=1000",player:"نيمار"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["كريم بنزيما","أوريلين تشواميني","كيليان مبابي","نجولو كانتي"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Karim_Benzema_in_2020.jpg?width=1000",player:"كريم بنزيما"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["روبرت ليفاندوفسكي","بيوتر زيلينسكي","فويتشيخ تشيزني","أركاديوش ميليك"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Robert_Lewandowski_%282024%29.jpg?width=1000",player:"روبرت ليفاندوفسكي"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["كيفن دي بروين","إيدن هازارد","يانيك كاراسكو","لياندرو تروسارد"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg?width=1000",player:"كيفن دي بروين"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["فينيسيوس جونيور","رودريغو","إندريك","رافينيا"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Vin%C3%ADcius_J%C3%BAnior_Brazil_V_Morocco_13_June_2026-207.jpg?width=1000",player:"فينيسيوس جونيور"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["لامين يامال","بيدري","جافي","فيران توريس"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lamine_Yamal_Argentina_v_Spain_19_July_2026-214_%28cropped_2%29.jpg?width=1000",player:"لامين يامال"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["جود بيلينغهام","ديكلان رايس","بوكايو ساكا","فيل فودين"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Jude_Bellingham_England_v_Ghana_23_June_2026-061.jpg?width=1000",player:"جود بيلينغهام"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["محمد صلاح","عمر مرموش","تريزيغيه","مصطفى محمد"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Mohamed_Salah_Argentina_v_Egypt_7_July_2026-161_%28cropped%29.jpg?width=1000",player:"محمد صلاح"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["لوكا مودريتش","مارسيلو بروزوفيتش","إيفان بيريشيتش","ماتيو كوفاسيتش"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Luka_Modric_Croatia_v_Portugal_2_July_2026-177.jpg?width=1000",player:"لوكا مودريتش"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["بيدري","جافي","فيرمين لوبيز","داني أولمو"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pedri_Argentina_v_Spain_19_July_2026-191.jpg?width=1000",player:"بيدري"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["بوكايو ساكا","جود بيلينغهام","كول بالمر","فيل فودين"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg?width=1000",player:"بوكايو ساكا"},
/* لاعبين إضافيين */
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["رونالدينيو","كاكا","تشافي","إنييستا"],x:0,wiki:"Ronaldinho"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["كاكا","رونالدينيو","رونالدو نازاريو","أدريانو"],x:0,wiki:"Kaká"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["تشافي","إنييستا","بوسكيتس","فابريغاس"],x:0,wiki:"Xavi"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["أندريس إنييستا","تشافي","دافيد سيلفا","بيدري"],x:0,wiki:"Andrés Iniesta"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["سيرجيو راموس","بيكيه","كارليس بويول","مارسيلو"],x:0,wiki:"Sergio Ramos"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["مارسيلو","داني ألفيس","سيرجيو راموس","كافو"],x:0,wiki:"Marcelo"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["هاري كين","سون هيونغ مين","جيمي فاردي","واين روني"],x:0,wiki:"Harry Kane"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["سون هيونغ مين","هاري كين","كاورو ميتوما","تاكيفوسا كوبو"],x:0,wiki:"Son Heung-min"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["روبرت ليفاندوفسكي","إيرلينغ هالاند","هاري كين","أولي واتكينز"],x:0,wiki:"Robert Lewandowski"},
{m:"playerguess",d:"متوسط",q:"من هذا اللاعب؟",a:["أنطوان غريزمان","كيليان مبابي","أوليفييه جيرو","عثمان ديمبيلي"],x:0,wiki:"Antoine Griezmann"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["رونالدو نازاريو","رونالدينيو","كاكا","ريفالدو"],x:0,wiki:"Ronaldo (Brazilian footballer)"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["زيدان","تييري هنري","باتريك فييرا","إيريك كانتونا"],x:0,wiki:"Zinedine Zidane"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["تييري هنري","ديدييه دروغبا","صامويل إيتو","دافيد تريزيغيه"],x:0,wiki:"Thierry Henry"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["لويس سواريز","إدينسون كافاني","دييغو فورلان","داروين نونيز"],x:0,wiki:"Luis Suárez"},
{m:"playerguess",d:"صعب",q:"من هذا اللاعب؟",a:["رياض محرز","إسماعيل بن ناصر","يوسف بلايلي","سعيد بن رحمة"],x:0,wiki:"Riyad Mahrez"},

/* خمن المشهور — مشاهير ويوتيوبرز عرب وأجانب */
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["MrBeast","PewDiePie","Markiplier","Logan Paul"],x:0,wiki:"MrBeast"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["PewDiePie","MrBeast","KSI","Markiplier"],x:0,wiki:"PewDiePie"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Markiplier","Jacksepticeye","MrBeast","PewDiePie"],x:0,wiki:"Markiplier"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["KSI","Logan Paul","Jake Paul","MrBeast"],x:0,wiki:"KSI"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Marques Brownlee","MrBeast","Linus Sebastian","Casey Neistat"],x:0,wiki:"Marques Brownlee"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Emma Chamberlain","Addison Rae","Charli D'Amelio","Liza Koshy"],x:0,wiki:"Emma Chamberlain"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Dwayne Johnson","Will Smith","Tom Cruise","Chris Hemsworth"],x:0,wiki:"Dwayne Johnson"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Taylor Swift","Ariana Grande","Selena Gomez","Dua Lipa"],x:0,wiki:"Taylor Swift"},
{m:"celebrityguess",d:"سهل",q:"من هذا المشهور؟",a:["Cristiano Ronaldo","Lionel Messi","Neymar","Kylian Mbappé"],x:0,wiki:"Cristiano Ronaldo"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Noor Stars","Anas Bukhash","Bessan Ismail","Narins Beauty"],x:0,wiki:"Noor Stars"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Anas Bukhash","Omar Farooq","Ahmed Aburob","Mo Vlogs"],x:0,wiki:"Anas Bukhash"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Bessan Ismail","Noor Stars","Narins Beauty","Shereen Abdel Wahab"],x:0,wiki:"Bessan Ismail"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Narins Beauty","Noor Stars","Bessan Ismail","Anas Bukhash"],x:0,wiki:"Narins Beauty"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Mo Vlogs","Anas Bukhash","Omar Farooq","Ahmed Aburob"],x:0,wiki:"Mo Vlogs"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Ahmed Aburob","Mo Vlogs","Omar Farooq","Anas Bukhash"],x:0,wiki:"Ahmad Aburob"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Omar Farooq","Anas Bukhash","Mo Vlogs","Ahmed Aburob"],x:0,wiki:"Omar Farooq"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Huda Kattan","Noor Stars","Haifa Beseisso","Aseel Omran"],x:0,wiki:"Huda Kattan"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Haifa Beseisso","Huda Kattan","Noor Stars","Bessan Ismail"],x:0,wiki:"Haifa Beseisso"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Mohamed Ramadan","Amr Diab","Tamer Hosny","Ahmed Saad"],x:0,wiki:"Mohamed Ramadan"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Amr Diab","Mohamed Ramadan","Tamer Hosny","Hany Shaker"],x:0,wiki:"Amr Diab"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Nancy Ajram","Elissa","Haifa Wehbe","Sherine"],x:0,wiki:"Nancy Ajram"},
{m:"celebrityguess",d:"متوسط",q:"من هذا المشهور؟",a:["Elissa","Nancy Ajram","Haifa Wehbe","Nawal Al Zoghbi"],x:0,wiki:"Elissa"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Adel Imam","Mohamed Henedi","Ahmed Mekky","Ahmed Helmy"],x:0,wiki:"Adel Imam"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Will Smith","Denzel Washington","Eddie Murphy","Jamie Foxx"],x:0,wiki:"Will Smith"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Tom Holland","Tom Hiddleston","Chris Evans","Andrew Garfield"],x:0,wiki:"Tom Holland"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Zendaya","Emma Stone","Margot Robbie","Anya Taylor-Joy"],x:0,wiki:"Zendaya"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Jackie Chan","Jet Li","Donnie Yen","Bruce Lee"],x:0,wiki:"Jackie Chan"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["The Weeknd","Drake","Bruno Mars","Post Malone"],x:0,wiki:"The Weeknd"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Ariana Grande","Selena Gomez","Miley Cyrus","Dua Lipa"],x:0,wiki:"Ariana Grande"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Kim Kardashian","Kylie Jenner","Kendall Jenner","Paris Hilton"],x:0,wiki:"Kim Kardashian"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Ryan Reynolds","Ryan Gosling","Chris Pratt","Chris Pine"],x:0,wiki:"Ryan Reynolds"},
{m:"celebrityguess",d:"صعب",q:"من هذا المشهور؟",a:["Lionel Messi","Cristiano Ronaldo","Neymar","Luis Suárez"],x:0,wiki:"Lionel Messi"},


/* خمن اليوتيوبر — عرب وأجانب */
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["أبو فلة","مستر بيست","IShowSpeed","KSI"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/%D8%A3%D8%A8%D9%88_%D9%81%D9%84%D8%A9.jpg?width=1000",creator:"أبو فلة"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["بلال فاضلي","أبو فلة","نور ستارز","أنس بوخش"],x:0,img:"https://images.socialblade.com/256x%2Cq75/https%3A//yt3.ggpht.com/LjaJW5MsERZ45ItgwrLyBBGGV4jrBv5kgVyUvISSdXcn5ws81Bkpe-4QKMHmAeM-6ijk_utPulE%3Ds192-c-k-c0x00ffffff-no-rj",creator:"بلال فاضلي"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["نور ستارز","نارين بيوتي","بيسان إسماعيل","هبة نور"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Noor_Naem.jpg?width=1000",creator:"نور ستارز"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["MrBeast","PewDiePie","Markiplier","KSI"],x:0,wiki:"MrBeast",creator:"MrBeast"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["PewDiePie","MrBeast","Jacksepticeye","Markiplier"],x:0,wiki:"PewDiePie",creator:"PewDiePie"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["KSI","Logan Paul","Jake Paul","MrBeast"],x:0,wiki:"KSI",creator:"KSI"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Markiplier","Jacksepticeye","PewDiePie","MrBeast"],x:0,wiki:"Markiplier",creator:"Markiplier"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Jacksepticeye","KSI","Markiplier","PewDiePie"],x:0,wiki:"Jacksepticeye",creator:"Jacksepticeye"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Logan Paul","Jake Paul","KSI","MrBeast"],x:0,wiki:"Logan Paul",creator:"Logan Paul"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Jake Paul","Logan Paul","KSI","MrBeast"],x:0,wiki:"Jake Paul",creator:"Jake Paul"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Marques Brownlee","Linus Sebastian","MrBeast","Casey Neistat"],x:0,wiki:"Marques Brownlee",creator:"Marques Brownlee"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["IShowSpeed","Kai Cenat","MrBeast","KSI"],x:0,wiki:"IShowSpeed",creator:"IShowSpeed"},
{m:"youtuberguess",d:"سهل",q:"من هذا اليوتيوبر؟",a:["Kai Cenat","IShowSpeed","MrBeast","KSI"],x:0,wiki:"Kai Cenat",creator:"Kai Cenat"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Dude Perfect","MrBeast","Ryan Trahan","Mark Rober"],x:0,wiki:"Dude Perfect",creator:"Dude Perfect"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Mark Rober","Dude Perfect","MrBeast","Marques Brownlee"],x:0,wiki:"Mark Rober",creator:"Mark Rober"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Ryan Trahan","MrBeast","Casey Neistat","Mark Rober"],x:0,wiki:"Ryan Trahan",creator:"Ryan Trahan"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Casey Neistat","Marques Brownlee","MrBeast","Ryan Trahan"],x:0,wiki:"Casey Neistat",creator:"Casey Neistat"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Philip DeFranco","MrBeast","PewDiePie","KSI"],x:0,wiki:"Philip DeFranco",creator:"Philip DeFranco"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Roman Atwood","MrBeast","Logan Paul","Jake Paul"],x:0,wiki:"Roman Atwood",creator:"Roman Atwood"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Lilly Singh","Emma Chamberlain","Liza Koshy","Marques Brownlee"],x:0,wiki:"Lilly Singh",creator:"Lilly Singh"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Emma Chamberlain","Liza Koshy","Lilly Singh","Charli D'Amelio"],x:0,wiki:"Emma Chamberlain",creator:"Emma Chamberlain"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Liza Koshy","Emma Chamberlain","Lilly Singh","MrBeast"],x:0,wiki:"Liza Koshy",creator:"Liza Koshy"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Charli D'Amelio","Addison Rae","Emma Chamberlain","Liza Koshy"],x:0,wiki:"Charli D'Amelio",creator:"Charli D'Amelio"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Addison Rae","Charli D'Amelio","Emma Chamberlain","Liza Koshy"],x:0,wiki:"Addison Rae",creator:"Addison Rae"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Mo Vlogs","Anas Bukhash","Omar Farooq","Ahmed Aburob"],x:0,wiki:"Mo Vlogs",creator:"Mo Vlogs"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Narins Beauty","Noor Stars","Bessan Ismail","AboFlah"],x:0,wiki:"Narins Beauty",creator:"Narins Beauty"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Bessan Ismail","Noor Stars","Narins Beauty","AboFlah"],x:0,wiki:"Bessan Ismail",creator:"بيسان إسماعيل"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Haifa Beseisso","Noor Stars","Narins Beauty","Bessan Ismail"],x:0,wiki:"Haifa Beseisso",creator:"هيفاء بسيسو"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Anas Bukhash","Mo Vlogs","Omar Farooq","Ahmed Aburob"],x:0,wiki:"Anas Bukhash",creator:"أنس بخاش"},
{m:"youtuberguess",d:"متوسط",q:"من هذا اليوتيوبر؟",a:["Omar Farooq","Mo Vlogs","Anas Bukhash","Ahmed Aburob"],x:0,wiki:"Omar Farooq",creator:"عمر فاروق"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Ahmed Aburob","Mo Vlogs","Omar Farooq","Anas Bukhash"],x:0,wiki:"Ahmad Aburob",creator:"أحمد أبو الرب"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Ghaith Marwan","Mo Vlogs","AboFlah","Omar Farooq"],x:0,wiki:"Ghaith Marwan",creator:"غيث مروان"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Anasala Family","Noor Stars","AboFlah","Narins Beauty"],x:0,wiki:"Anasala Family",creator:"أنس وأصالة"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["BanderitaX","AboFlah","Mo Vlogs","Ghaith Marwan"],x:0,wiki:"BanderitaX",creator:"بندريتا"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["FouseyTube","KSI","Logan Paul","MrBeast"],x:0,wiki:"FouseyTube",creator:"FouseyTube"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["SSSniperWolf","Pokimane","Valkyrae","Lilly Singh"],x:0,wiki:"SSSniperWolf",creator:"SSSniperWolf"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Pokimane","Valkyrae","SSSniperWolf","Lilly Singh"],x:0,wiki:"Pokimane",creator:"Pokimane"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Valkyrae","Pokimane","SSSniperWolf","Emma Chamberlain"],x:0,wiki:"Valkyrae",creator:"Valkyrae"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["TommyInnit","Dream","GeorgeNotFound","Sapnap"],x:0,wiki:"TommyInnit",creator:"TommyInnit"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Dream","TommyInnit","GeorgeNotFound","Sapnap"],x:0,wiki:"Dream (YouTuber)",creator:"Dream"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["GeorgeNotFound","Dream","TommyInnit","Sapnap"],x:0,wiki:"GeorgeNotFound",creator:"GeorgeNotFound"},
{m:"youtuberguess",d:"صعب",q:"من هذا اليوتيوبر؟",a:["Sapnap","Dream","GeorgeNotFound","TommyInnit"],x:0,wiki:"Sapnap",creator:"Sapnap"},

/* خمن بالإيموجي — لعبة جديدة */
{m:"emoji",d:"سهل",q:"🎭 خمن الفيلم: 🧊🚢💔",a:["Titanic","Frozen","Avatar","Joker"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الفيلم: 🦁👑🌅",a:["The Lion King","Madagascar","Aladdin","Tarzan"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الفيلم: 🧙‍♂️⚡🏰",a:["Harry Potter","The Hobbit","Narnia","Percy Jackson"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الفيلم: 🦖🏝️🚙",a:["Jurassic Park","Jumanji","King Kong","Godzilla"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الشخصية: 🦇🌃🖤",a:["Batman","Spider-Man","Superman","Iron Man"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الشخصية: 🕷️🕸️🏙️",a:["Spider-Man","Batman","Flash","Hulk"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن الشخصية: 🦾🤖❤️",a:["Iron Man","Optimus Prime","Hulk","Thor"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن اللعبة: ⛏️🟩🧱",a:["Minecraft","Fortnite","Roblox","Terraria"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن اللعبة: 🚌🔫🏝️",a:["Fortnite","PUBG","Free Fire","Apex Legends"],x:0},
{m:"emoji",d:"سهل",q:"🎭 خمن اللعبة: 🧱👤🎮",a:["Roblox","Minecraft","Among Us","Fall Guys"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 🦸‍♂️🛡️🇺🇸",a:["Captain America","Superman","Thor","Black Panther"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 🦸‍♂️⚡🔨",a:["Thor","Shazam","Hulk","Aquaman"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 💍🧙‍♂️🌋",a:["The Lord of the Rings","Harry Potter","The Hobbit","Game of Thrones"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 🏠🎈👴",a:["Up","Home Alone","Toy Story","Coco"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 🎸💀🌼",a:["Coco","Soul","Encanto","Moana"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن الفيلم: 🐠🔎🌊",a:["Finding Nemo","The Little Mermaid","Moana","Shark Tale"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن اللعبة: 👻🔦🏚️",a:["Phasmophobia","Resident Evil","Outlast","Amnesia"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن اللعبة: 🧑‍🚀🔴🔪",a:["Among Us","Dead by Daylight","The Forest","Rust"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن اللعبة: 🏎️💨🏁",a:["Need for Speed","Rocket League","Forza Horizon","Mario Kart"],x:0},
{m:"emoji",d:"متوسط",q:"🎭 خمن اللعبة: 🏰⚔️🐉",a:["Dark Souls","Skyrim","Elden Ring","The Witcher"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن المسلسل: 🐉👑⚔️",a:["Game of Thrones","Vikings","The Witcher","The Last Kingdom"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن المسلسل: 🧪💰🎩",a:["Breaking Bad","Narcos","Ozark","Peaky Blinders"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن المسلسل: 🦑🎮🔺",a:["Squid Game","Alice in Borderland","Money Heist","Dark"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن المسلسل: 💰🎭🇪🇸",a:["La Casa de Papel","Elite","Dark","Vis a Vis"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن اللعبة: 🧟‍♂️🔫🏚️",a:["Resident Evil","Left 4 Dead","Dying Light","The Last of Us"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن اللعبة: 🧟‍♂️🏙️🌙",a:["Dying Light","Days Gone","Resident Evil","Dead Island"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن اللعبة: 🧙‍♂️🐺⚔️",a:["The Witcher 3","Skyrim","Elden Ring","Dark Souls"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن اللعبة: 🚀🌌👽",a:["Mass Effect","Starfield","Halo","No Man's Sky"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن الشخصية: 🟡👻🍒",a:["Pac-Man","Sonic","Pikachu","Kirby"],x:0},
{m:"emoji",d:"صعب",q:"🎭 خمن الشخصية: 🔵💨🦔",a:["Sonic","Mega Man","Mario","Crash Bandicoot"],x:0},


/* خمن الصورة — 35 سؤالاً بصور حقيقية من Wikimedia Commons */
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Apple","Samsung","Sony","Huawei"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Apple_iPhone.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Coca-Cola","Pepsi","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Coca-cola_bottle.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Nike","Adidas","Puma","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nike_Shoe.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Nintendo","Sony","Microsoft","Sega"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nintendo_switch.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Samsung","Apple","LG","Huawei"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Samsung_galaxy.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["BMW","Mercedes","Audi","Toyota"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_car.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Ferrari","Porsche","Lamborghini","BMW"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Ferrari.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Nikon","Canon","Sony","Fujifilm"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nikon_Camera.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Dell","HP","Lenovo","ASUS"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Dell_Laptop.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"سهل",q:"ما العلامة التجارية لهذا المنتج؟",a:["Lenovo","Dell","HP","Acer"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lenovo_laptop_2025.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["HP","Dell","Lenovo","ASUS"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/HP_Laptop_Notebook.png?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Rolex","Casio","Seiko","Omega"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Rare_Rolex_Watch.png?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Microsoft","Sony","Nintendo","Sega"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft-Xbox-One-X-Console.png?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Pepsi","Coca-Cola","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepsi_Can.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Sony","Canon","Nikon","JBL"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sony_camera.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Sony","Canon","Nikon","JBL"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sony_Headphones_(7309383730).jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Adidas","Nike","Puma","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Adidas_shoe.JPG?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Puma","Nike","Adidas","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Puma_schuhe.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Reebok","Nike","Adidas","Puma"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Reebok_Indoor_Sports_Shoes.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Apple","Samsung","Sony","Huawei"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Apple_watch.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Nike","Adidas","Puma","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nike_shoes.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Adidas","Nike","Puma","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/An_Adidas_shoe.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Puma","Nike","Adidas","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Puma_shoes.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"متوسط",q:"ما العلامة التجارية لهذا المنتج؟",a:["Puma","Nike","Adidas","Reebok"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Puma_Shoes.jpeg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Coca-Cola","Pepsi","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Coca-Cola_Bottle.jpeg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Coca-Cola","Pepsi","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/CocaColaBottle.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Pepsi","Coca-Cola","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepsi.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Pepsi","Coca-Cola","Fanta","Sprite"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepsi_bottles.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Sony","Canon","Nikon","JBL"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sony_Headphones_(40476165073).jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["HP","Dell","Lenovo","ASUS"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/HP_Laptop_15-da1xxx_(1).jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Lenovo","Dell","HP","Acer"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lenovo_laptop_2019.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["BMW","Mercedes","Audi","Toyota"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_car_20250519B.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["BMW","Mercedes","Audi","Toyota"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/BMW_car_20250515A.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Sony","Canon","Nikon","JBL"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/PlayStation_5.jpg?width=1000",product:"منتج حقيقي"},
{m:"imageguess",d:"صعب",q:"ما العلامة التجارية لهذا المنتج؟",a:["Sony","Canon","Nikon","JBL"],x:0,img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Black_and_white_Playstation_5_base_edition_with_controller.png?width=1000",product:"منتج حقيقي"},

/* كلمة السر */
{m:"password",d:"سهل",q:"🔐 كلمة السر: شيء له عقارب ونستخدمه لمعرفة الوقت.",a:["ساعة","كتاب","مصباح","كرسي"],x:0},
{m:"password",d:"سهل",q:"🔐 كلمة السر: شيء نستخدمه لفتح باب مقفل.",a:["مفتاح","قلم","مرآة","حذاء"],x:0},
{m:"password",d:"سهل",q:"🔐 كلمة السر: أداة نكتب بها على الورق.",a:["قلم","ملعقة","مفتاح","مرآة"],x:0},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: جهاز يحفظ الطعام بارداً.",a:["فرن","ثلاجة","غسالة","مكيف"],x:1},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: جهاز نستخدمه للاتصال وإرسال الرسائل.",a:["هاتف","ثلاجة","تلفاز","مصباح"],x:0},
{m:"password",d:"متوسط",q:"🔐 كلمة السر: مكان نشاهد فيه مباريات كرة القدم.",a:["ملعب","مكتبة","متحف","مطار"],x:0},
{m:"password",d:"صعب",q:"🔐 كلمة السر: مادة شفافة تستخدم كثيراً في النوافذ.",a:["زجاج","حديد","خشب","قطن"],x:0},
{m:"password",d:"صعب",q:"🔐 كلمة السر: شبكة عالمية تربط ملايين الأجهزة.",a:["الإنترنت","البلوتوث","الراديو","GPS"],x:0},

/* صح أو خطأ */
{m:"tf",d:"سهل",q:"الشمس نجم.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"الماء يتجمد عند 0 درجة مئوية في الظروف القياسية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"القاهرة هي عاصمة الجزائر.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"العنكبوت له ثماني أرجل.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الذهب رمزه الكيميائي Au.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الخفاش من الثدييات.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الأخطبوط لديه ثلاثة قلوب.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الصوت ينتقل في الفراغ.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"البرق يمكن أن يكون أسخن من سطح الشمس.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الخفاش من الطيور.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"القطط من الثدييات.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"الشمس تدور حول الأرض.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"الماء يمكن أن يوجد في الحالة الصلبة والسائلة والغازية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"عدد أشهر السنة 12 شهراً.",a:["صح","خطأ"],x:0},
{m:"tf",d:"سهل",q:"القمر كوكب.",a:["صح","خطأ"],x:1},
{m:"tf",d:"سهل",q:"الجزائر تقع في قارة أفريقيا.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"كوكب المشتري أكبر من كوكب الأرض.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الحديد أخف من الريش.",a:["صح","خطأ"],x:1},
{m:"tf",d:"متوسط",q:"الإنسان البالغ لديه عادة 206 عظمة تقريباً.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"البحر المتوسط أكبر من المحيط الهادئ.",a:["صح","خطأ"],x:1},
{m:"tf",d:"متوسط",q:"النباتات تحتاج إلى الضوء لصنع غذائها في عملية البناء الضوئي.",a:["صح","خطأ"],x:0},
{m:"tf",d:"متوسط",q:"الذهب رمزه الكيميائي Ag.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"كوكب الزهرة هو أقرب كوكب إلى الشمس.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"سرعة الضوء أكبر من سرعة الصوت.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"الحمض النووي DNA يوجد في خلايا الكائنات الحية.",a:["صح","خطأ"],x:0},
{m:"tf",d:"صعب",q:"قارة أفريقيا هي أصغر قارات العالم مساحةً.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"البرمجة بلغة HTML وحدها تكفي لإنشاء قاعدة بيانات.",a:["صح","خطأ"],x:1},
{m:"tf",d:"صعب",q:"المحيط الأطلسي أصغر من المحيط الهادئ.",a:["صح","خطأ"],x:0}
];

let selectedMode = "quiz";
let round = [];
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
let answered = false;
let hintCharges = 1;
let correctCount = 0;
let friendMode = false;
let friendPlayers = [];
let friendScores = {};
let friendTurn = 0;
let friendQuestionIndex = 0;
let friendCorrectCounts = {};
let liveClientId = localStorage.getItem("m5kLiveClientId") || (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
localStorage.setItem("m5kLiveClientId", liveClientId);
let liveHeartbeatTimer = null;
let liveCountValue = 0;

const el = id => document.getElementById(id);

function show(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = el(id);
  if(page) page.classList.add("active");
  if(id === "profile") updateStats();
  if(id === "leaders") updateLeaders();
}

function animateLiveCount(target){
  target = Math.max(0, Number(target)||0);
  const elCount = el("friendsLiveCount");
  if(!elCount) return;
  const from = liveCountValue;
  const diff = target - from;
  if(!diff){ elCount.textContent = target.toLocaleString("en-US"); return; }
  const start = performance.now();
  const duration = 450;
  function step(now){
    const p = Math.min(1, (now-start)/duration);
    const eased = p < .5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
    const value = Math.round(from + diff*eased);
    elCount.textContent = value.toLocaleString("en-US");
    if(p < 1) requestAnimationFrame(step); else liveCountValue = target;
  }
  requestAnimationFrame(step);
}
function renderFriendsLive(data){
  const count = Number(data?.count)||0;
  const status = el("friendsLiveStatus");
  const box = el("friendsLivePlayers");
  animateLiveCount(count);
  if(status){
    status.classList.toggle("offline", count===0);
    status.textContent = count > 0 ? "● LIVE الآن" : "○ لا توجد غرفة LIVE";
  }
  if(box){
    const players = Array.isArray(data?.players) ? data.players : [];
    if(!players.length){ box.innerHTML = '<span class="live-empty">لا توجد غرفة نشطة الآن</span>'; return; }
    const visible = players.slice(0,4);
    box.innerHTML = visible.map(name=>`<i class="live-avatar" title="${escapeHtml(name)}">${escapeHtml(String(name||"ل").trim().charAt(0)||"ل")}</i>`).join("")
      + (players.length>4 ? `<span class="live-more">+${players.length-4}</span>` : "");
  }
}
async function refreshFriendsLive(){
  try{
    const r=await fetch('/api/live/friends',{cache:'no-store'});
    if(!r.ok) throw new Error();
    renderFriendsLive(await r.json());
  }catch(e){
    renderFriendsLive({count:0,players:[]});
  }
}
function startFriendsHeartbeat(){
  stopFriendsHeartbeat();
  const send=()=>fetch('/api/live/friends/heartbeat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientId:liveClientId,players:friendPlayers}),keepalive:true}).catch(()=>{});
  send();
  liveHeartbeatTimer=setInterval(send,4000);
}
function stopFriendsHeartbeat(){
  if(liveHeartbeatTimer){clearInterval(liveHeartbeatTimer);liveHeartbeatTimer=null;}
}
function leaveFriendsHeartbeat(){
  fetch('/api/live/friends/leave',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientId:liveClientId}),keepalive:true}).catch(()=>{});
}

function startFriendsSetup(){
  show("friendsSetup");
}

function startFriendsGame(){
  const raw = (el("friendNames")?.value || "").split(/[،,\n]+/).map(x=>x.trim()).filter(Boolean);
  const names = [...new Set(raw)].slice(0,6);
  if(names.length < 2){
    alert("أدخل اسم لاعبين على الأقل.");
    return;
  }
  friendPlayers = names;
  friendScores = {};
  names.forEach(n => friendScores[n] = 0);
  friendTurn = 0;
  friendQuestionIndex = 0;
  friendCorrectCounts = {};
  names.forEach(n => friendCorrectCounts[n] = 0);
  friendMode = true;
  startFriendsHeartbeat();
  selectedMode = "quiz";
  const wanted = parseInt(el("friendQCount")?.value,10) || 10;
  const pool = shuffle(questions.filter(q => q.m === "quiz" || q.m === "mixed"));
  const seen = new Set();
  round = pool.filter(q => !seen.has(q.q) && (seen.add(q.q), true)).slice(0, Math.min(wanted, pool.length));
  if(!round.length){ alert("لا توجد أسئلة لتحدي الأصدقاء."); return; }
  current = 0; score = 0; hintCharges = 1; correctCount = 0; answered = false;
  updateHintButton();
  show("quiz");
  renderQuestion();
}

function chooseMode(mode){
  if(!modes[mode]) mode = "quiz";
  selectedMode = mode;
  friendMode = false;
  const saved = localStorage.getItem("m5kPlayerName") || "";
  const name = el("gameName");
  const player = el("playerName");
  if(player) player.value = saved;
  if(name) name.value = modes[mode].name;
  if(el("qCount")) {
    el("qCount").value = (mode === "imageguess" || mode === "playerguess" || mode === "tf") ? "30" : "15";
  }
  show("create");
}

function shuffle(array){
  const a = [...array];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function buildRound(){
  const pool = selectedMode === "mixed"
    ? questions
    : questions.filter(q => q.m === selectedMode);

  const unique = [];
  const seen = new Set();
  for(const q of shuffle(pool)){
    const uniqueKey = (q.m === "imageguess" || q.m === "playerguess" || q.m === "celebrityguess" || q.m === "youtuberguess")
      ? `${q.m}|${q.creator || q.wiki || q.product || q.img || q.q}`
      : q.q;
    if(!seen.has(uniqueKey)){
      seen.add(uniqueKey);
      unique.push(q);
    }
  }

  let wanted = parseInt(el("qCount")?.value, 10) || 15;
  if (selectedMode === "imageguess" || selectedMode === "playerguess" || selectedMode === "celebrityguess" || selectedMode === "youtuberguess") {
    wanted = 30;
  } else if (selectedMode === "tf") {
    wanted = Math.max(10, Math.min(wanted, 28));
  } else {
    wanted = Math.max(10, wanted);
  }

  // انسخ السؤال ثم اخلط الاختيارات حتى لا تكون الإجابة الصحيحة دائمًا الخيار الأول.
  round = unique.slice(0, Math.min(wanted, unique.length)).map(q => {
    const copy = {...q, a:[...(q.a || [])]};
    const correctAnswer = copy.a[copy.x];
    const shuffledAnswers = shuffle(copy.a);
    copy.a = shuffledAnswers;
    copy.x = shuffledAnswers.indexOf(correctAnswer);
    return copy;
  });
}

function startGame(){
  stopFriendsHeartbeat();
  leaveFriendsHeartbeat();
  window.m5kRoundCorrect=0;
  clearInterval(timer);
  const name = (el("playerName")?.value || "").trim().slice(0,20);
  if(!name){
    alert("اكتب اسمك أولاً حتى تظهر نتيجتك في المتصدرين 🏆");
    el("playerName")?.focus();
    return;
  }
  localStorage.setItem("m5kPlayerName", name);

  buildRound();
  if(!round.length){
    alert("لا توجد أسئلة لهذه اللعبة.");
    return;
  }

  current = 0;
  score = 0;
  hintCharges = 1;
  correctCount = 0;
  friendMode = false;
  answered = false;
  updateHintButton();
  show("quiz");
  renderQuestion();
}

function productSVG(type){
  const safe = String(type || "").replace(/[^a-zA-Z0-9_.-]/g, "");
  return `<div class="product-image"><img src="images/${safe}" alt="صورة المنتج مع إخفاء اسم الشركة" loading="eager"></div>`;
}

function sendContactMessage(){
  const name=(el("contactName")?.value||"").trim();
  const email=(el("contactEmail")?.value||"").trim();
  const message=(el("contactMessage")?.value||"").trim();
  if(!message){ alert("اكتب رسالتك أولًا."); return; }
  const subject=encodeURIComponent(`رسالة من موقع مِخّك${name ? ` — ${name}` : ""}`);
  const body=encodeURIComponent(`الاسم: ${name||"غير مذكور"}\nالبريد: ${email||"غير مذكور"}\n\nالرسالة:\n${message}`);
  window.location.href=`mailto:mmtofik9@gmail.com?subject=${subject}&body=${body}`;
}

function renderQuestion(){
  clearInterval(timer);

  if(current >= round.length){
    finishGame();
    return;
  }

  const q = round[current];
  const game = modes[q.m] || modes.quiz;
  answered = false;

  el("qNumber").textContent = friendMode
    ? `دور: ${friendPlayers[friendTurn]} — السؤال ${current + 1} / ${round.length}`
    : `السؤال ${current + 1} / ${round.length}`;
  el("qCat").textContent = q.m === "guess" ? "🎯 خمنها" :
                           q.m === "imageguess" ? "خمن الصورة" :
                           q.m === "playerguess" ? "⚽ خمن اللاعب" :
                           q.m === "celebrityguess" ? "🌟 خمن المشهور" :
                           q.m === "youtuberguess" ? "▶️ خمن اليوتيوبر" :
                           q.m === "emoji" ? "🎭 خمن بالإيموجي" :
                           q.m === "password" ? "🔐 كلمة السر" :
                           q.m === "tf" ? "صح أو خطأ" :
                           q.m === "speed" ? "⚡ سرعة" : "🧠 منوعات";

  let imageBox = document.getElementById("imageGuessBox");
  if(!imageBox){
    imageBox = document.createElement("div");
    imageBox.id = "imageGuessBox";
    const qt = el("questionText");
    qt.parentNode.insertBefore(imageBox, qt);
  }
  if(q.m === "imageguess") {
    imageBox.style.display = "block";
    imageBox.innerHTML = `<div class="real-product-photo"><img id="visualImage" src="${q.img || ""}" alt="صورة منتج حقيقية" loading="eager"><div class="brand-blur" aria-hidden="true"></div></div>`;
  } else if(q.m === "playerguess") {
    imageBox.style.display = "block";
    imageBox.innerHTML = `<div class="real-player-photo"><img id="visualImage" src="${q.img || ""}" alt="صورة لاعب كاملة" loading="eager"></div>`;
  } else if(q.m === "celebrityguess") {
    imageBox.style.display = "block";
    imageBox.innerHTML = `<div class="real-celebrity-photo"><img id="visualImage" src="${q.img || ""}" alt="صورة المشهور" loading="eager"></div>`;
  } else if(q.m === "youtuberguess") {
    imageBox.style.display = "block";
    imageBox.innerHTML = `<div class="real-youtuber-photo"><img id="visualImage" src="${q.img || ""}" alt="صورة اليوتيوبر" loading="eager"></div>`;
  } else {
    imageBox.style.display = "none";
    imageBox.innerHTML = "";
  }
  const visual = document.getElementById("visualImage");
  const setVisual = (url) => {
    if(url && visual && document.getElementById("visualImage") === visual){
      visual.src = url;
      visual.dataset.loadedFromWiki = "1";
    }
  };
  const loadWikiImage = (title) => {
    if(!title || !visual) return Promise.resolve();
    return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const url = data?.thumbnail?.source || data?.originalimage?.source;
        if(url){ setVisual(url); return true; }
        throw new Error("no-rest-image");
      })
      .catch(() => fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(title)}&gsrnamespace=0&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=1000&format=json&origin=*`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          const pages = data?.query?.pages || {};
          const page = Object.values(pages)[0];
          const url = page?.thumbnail?.source;
          if(url){ setVisual(url); return true; }
          return false;
        }).catch(()=>false));
  };

  if(visual){
    let triedFallback = false;
    visual.onerror = () => {
      if(triedFallback) return;
      triedFallback = true;
      loadWikiImage(q.wiki || q.creator || "").then(ok=>{
        if(!ok){
          // إذا لم نجد صورة للمشهور/اللاعب/اليوتيوبر، نوضح السبب ثم نتخطى السؤال فورًا.
          // نحذف السؤال الفاشل من الجولة حتى لا يعود مرة أخرى.
          const failedQuestion = round[current];
          round.splice(current, 1);
          if (failedQuestion && (failedQuestion.m === "celebrityguess" || failedQuestion.m === "playerguess" || failedQuestion.m === "youtuberguess")) {
            const skipMsg = el("answerMsg");
            if(skipMsg){
              skipMsg.textContent = "⚠️ تم تخطي هذا السؤال لأن صورة الشخص لم تُحمّل، لذلك انتقلنا للسؤال التالي.";
              skipMsg.style.color = "#fbbf24";
            }
            setTimeout(() => {
              if (current >= round.length) {
                finishGame();
              } else {
                renderQuestion();
              }
            }, 900);
            return;
          }
          visual.style.display = "none";
          const box = visual.parentElement;
          if(box) box.classList.add("image-unavailable");
        }
      });
    };
    if(q.wiki) loadWikiImage(q.wiki).then(ok=>{
      if(!ok && visual && !visual.src) visual.dispatchEvent(new Event("error"));
    });
  }

  el("questionText").textContent = q.q;
  el("scoreNow").textContent = friendMode ? friendScores[friendPlayers[friendTurn]] : score;

  let hintInfo = document.getElementById("hintInfo");
  if(!hintInfo){
    hintInfo = document.createElement("div");
    hintInfo.id = "hintInfo";
    hintInfo.style.cssText = "margin:12px auto 0;max-width:720px;text-align:center;color:#bca8ff;font-size:14px";
    const quizBox = document.querySelector(".quiz-box");
    if(quizBox) quizBox.parentNode.insertBefore(hintInfo, quizBox);
  }
  hintInfo.textContent = friendMode
    ? `💡 كل 5 إجابات صحيحة تمنحك تلميحًا إضافيًا. لديك الآن ${hintCharges} تلميح.`
    : `💡 كل 5 إجابات صحيحة تمنحك تلميحًا إضافيًا. لديك الآن ${hintCharges} تلميح.`;

  const diff = q.d === "سهل" ? "🌱 سهل" : q.d === "متوسط" ? "⚡ متوسط" : "🔥 صعب";
  // qCat is used by this HTML for the visible category; keep the question itself visible regardless.

  const answers = el("answers");
  answers.innerHTML = "";
  q.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => submitAnswer(index, button));
    answers.appendChild(button);
  });

  el("answerMsg").textContent = "";
  el("answerMsg").style.color = "";

  const limit = q.m === "speed"
    ? 7
    : q.m === "tf"
      ? 8
      : (q.m === "imageguess" || q.m === "playerguess" || q.m === "celebrityguess" || q.m === "youtuberguess")
        ? 18
      : q.d === "صعب" ? 20 : q.d === "متوسط" ? 16 : 13;

  timeLeft = limit;
  el("timer").textContent = timeLeft;
  el("progress").style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;
    el("timer").textContent = timeLeft;
    el("progress").style.width = `${Math.max(0, (timeLeft / limit) * 100)}%`;
    if(timeLeft <= 0) submitAnswer(-1, null);
  }, 1000);
}

function updateHintButton(){
  const button = document.querySelector(".hint-btn");
  if(!button) return;
  button.disabled = hintCharges <= 0;
  button.textContent = hintCharges > 0 ? `🔮 تلميح (${hintCharges})` : "🔒 لا يوجد تلميح";
}

function useNextHint(){
  if(hintCharges <= 0 || answered || !round[current]) return;
  hintCharges--;
  updateHintButton();

  const q = round[current];
  const buttons = [...document.querySelectorAll(".answer-btn")];
  const wrong = buttons.map((b,i)=>({b,i})).filter(x=>x.i !== q.x && !x.b.disabled);
  // التلميح يكشف الإجابة كاملة، ويضع علامة ✖ بجانب كل الخيارات الخاطئة.
  wrong.forEach(({b})=>{
    b.disabled = true;
    if(!b.textContent.includes("✖")) b.textContent += "  ✖";
  });
  const msg = el("answerMsg");
  if(msg){
    const correct = String(q.a[q.x] ?? "");
    msg.textContent = `💡 التلميح: الإجابة الصحيحة هي «${correct}» — الخيارات الخاطئة عليها ✖`;
    msg.style.color = "#c5aaff";
  }
}

function submitAnswer(choice, button){
  if(answered) return;
  answered = true;
  clearInterval(timer);

  const q = round[current];
  const correct = choice === q.x;
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((b,i)=>{ b.disabled=true; if(i===q.x) b.classList.add("correct"); if(i===choice && !correct) b.classList.add("wrong"); });

  const msg = el("answerMsg");
  let earned = 0;
  if(correct){
    const base = q.d === "صعب" ? 300 : q.d === "متوسط" ? 200 : 100;
    const bonus = Math.max(0,timeLeft*5);
    earned = base + bonus;
    if(friendMode){
      const player = friendPlayers[friendTurn];
      friendScores[player] += earned;
      friendCorrectCounts[player] = (friendCorrectCounts[player] || 0) + 1;
      el("scoreNow").textContent = friendScores[player];
      if(friendCorrectCounts[player] % 5 === 0){
        hintCharges++;
        updateHintButton();
        msg.textContent = `صحيح! +${earned} نقطة — حصل ${player} على تلميح جديد بعد 5 إجابات صحيحة.`;
      }else{
        msg.textContent = `صحيح! +${earned} نقطة`;
      }
    }else{
      score += earned;
      correctCount++; window.m5kRoundCorrect=(window.m5kRoundCorrect||0)+1;
      el("scoreNow").textContent = score;
      if(correctCount % 5 === 0){
        hintCharges++;
        updateHintButton();
        msg.textContent = `صحيح! +${earned} نقطة — حصلت على تلميح جديد بعد 5 إجابات صحيحة.`;
      }else{
        msg.textContent = `صحيح! +${earned} نقطة`;
      }
    }
    msg.style.color="#4ade80";
  }else{
    msg.textContent = choice === -1 ? "⏰ انتهى الوقت!" : "❌ إجابة خاطئة";
    msg.style.color="#fb7185";
  }

  setTimeout(()=>{
    if(friendMode){
      friendTurn = (friendTurn + 1) % friendPlayers.length;
    }
    current++;
    renderQuestion();
  },900);
}

function saveResultToBackend(modeName, finalScore, correctAnswers, totalQuestions){
  const token=localStorage.getItem('m5kToken');
  if(!token) return;
  fetch('/api/results',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({mode:modeName,score:finalScore,correctAnswers,totalQuestions})}).catch(()=>{});
}

function finishGame(){
  clearInterval(timer);
  if(friendMode){
    stopFriendsHeartbeat();
    leaveFriendsHeartbeat();
    const ranking = Object.entries(friendScores).sort((a,b)=>b[1]-a[1]);
    const winner = ranking[0];
    const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
    ranking.forEach(([player, playerScore]) => history.unshift({name:player, mode:"friends", score:playerScore, date:new Date().toLocaleDateString("ar-DZ")}));
    localStorage.setItem("m5kHistory", JSON.stringify(history.slice(0,100)));
    saveResultToBackend('friends',winner[1],Math.max(0,...Object.values(friendCorrectCounts)),round.length);
    el("resultTitle").textContent = "🏆 انتهى تحدي الأصدقاء!";
    el("resultText").innerHTML = `الفائز: <b>${escapeHtml(winner[0])}</b><br>` + ranking.map((r,i)=>`${i+1}. ${escapeHtml(r[0])} — ${r[1]} نقطة`).join("<br>");
    el("resultScore").textContent = winner[1]; show("result"); return;
  }
  const name = localStorage.getItem("m5kPlayerName") || "لاعب";
  const modeName = modes[selectedMode]?.name || "اللعبة";
  const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
  history.unshift({name,mode:selectedMode,score,date:new Date().toLocaleDateString("ar-DZ")});
  localStorage.setItem("m5kHistory",JSON.stringify(history.slice(0,50)));
  const best = Number(localStorage.getItem("m5kBest") || 0); if(score > best) localStorage.setItem("m5kBest",String(score));
  const correctAnswers = Number(window.m5kRoundCorrect || 0);
  saveResultToBackend(selectedMode,score,correctAnswers,round.length);
  el("resultTitle").textContent="🏆 انتهت اللعبة!";
  el("resultText").textContent=`${name}، نتيجتك في ${modeName} هي ${score} نقطة.`;
  el("resultScore").textContent=score; show("result");
}

function playAgain(){
  if(friendMode){
    friendTurn=0; friendScores={}; friendCorrectCounts={}; friendPlayers.forEach(n=>{friendScores[n]=0;friendCorrectCounts[n]=0;}); current=0; hintCharges=1; correctCount=0; answered=false; round=shuffle(round); show("quiz"); renderQuestion();
  }else{ startGame(); }
}

function updateStats(){
  const history = JSON.parse(localStorage.getItem("m5kHistory") || "[]");
  const games = history.length;
  const points = history.reduce((sum, x) => sum + (Number(x.score) || 0), 0);
  const best = Math.max(0, ...history.map(x => Number(x.score) || 0));

  if(el("profileGames")) el("profileGames").textContent = games;
  if(el("profileWins")) el("profileWins").textContent = history.filter(x => Number(x.score) > 0).length;
  if(el("profilePoints")) el("profilePoints").textContent = points;
  if(el("profileTokens")) el("profileTokens").textContent = hintCharges;
  if(el("bestScore")) el("bestScore").textContent = best;
}

async function updateLeaders(){
  const board=document.querySelector('.leaderboard'); if(!board) return;
  try{
    const r=await fetch('/api/leaderboard');
    if(!r.ok) throw new Error();
    const data=await r.json();
    const rows=data.players||[];
    if(rows.length){ board.innerHTML=rows.slice(0,10).map((r,i)=>`<div class="leader ${i===0?'first':''}"><b>${i+1}</b><i>${escapeHtml((r.username||'ل').charAt(0))}</i><span>${escapeHtml(r.username)}</span><strong>${Number(r.best_score)||0}</strong></div>`).join(''); }
    else board.innerHTML='<p>لا توجد نتائج عالمية بعد. سجّل حسابًا والعب أول جولة!</p>';
  }catch(e){
    const history=JSON.parse(localStorage.getItem('m5kHistory')||'[]'); const best={}; history.forEach(x=>best[x.name]=Math.max(best[x.name]||0,Number(x.score)||0));
    const rows=Object.entries(best).sort((a,b)=>b[1]-a[1]).slice(0,10);
    board.innerHTML=rows.length?rows.map((r,i)=>`<div class="leader ${i===0?'first':''}"><b>${i+1}</b><i>${escapeHtml((r[0]||'ل').charAt(0))}</i><span>${escapeHtml(r[0])}</span><strong>${r[1]}</strong></div>`).join(''):'<p>العب أول جولة لتظهر نتائجك هنا.</p>';
  }
}

let authMode='login';
function openAuth(mode='login'){authMode=mode; show('auth'); renderAuth();}
function toggleAuthMode(){authMode=authMode==='login'?'register':'login';renderAuth();}
function renderAuth(){
  const reg=authMode==='register';
  if(el('authTitle')) el('authTitle').textContent=reg?'إنشاء حساب':'تسجيل الدخول';
  if(el('authSubtitle')) el('authSubtitle').textContent=reg?'أنشئ حسابًا واحفظ نتائجك في المتصدرين العالميين.':'سجّل دخولك لحفظ نتائجك في المتصدرين العالميين.';
  if(el('authUsernameWrap')) el('authUsernameWrap').style.display=reg?'block':'none';
  if(el('authLoginLabel')) el('authLoginLabel').textContent=reg?'البريد الإلكتروني':'اسم المستخدم أو البريد الإلكتروني';
  if(el('authEmail')) el('authEmail').placeholder=reg?'mmtofik9@gmail.com':'TOUFIK_GAMER';
  if(el('authEmail')) el('authEmail').type=reg?'email':'text';
  if(el('authPassword')) el('authPassword').placeholder='password';
  if(el('authSubmit')) el('authSubmit').textContent=reg?'إنشاء الحساب':'تسجيل الدخول';
  if(el('authSwitch')) el('authSwitch').textContent=reg?'لديك حساب؟ تسجيل الدخول':'ليس لديك حساب؟ إنشاء حساب';
  if(el('authMsg')) el('authMsg').textContent='';
}
async function submitAuth(){
  const msg=el('authMsg'); msg.style.color=''; msg.textContent='جاري المعالجة...';
  if(location.protocol==='file:'){
    msg.textContent='⚠️ شغّل M5K من http://localhost:3000 بعد تشغيل Backend، ولا تفتح index.html مباشرة.';
    msg.style.color='#fbbf24'; return;
  }
  const body={login:el('authEmail').value.trim(),email:el('authEmail').value.trim(),password:el('authPassword').value};
  if(authMode==='register') body.username=el('authUsername').value.trim();
  try{
    const r=await fetch('/api/auth/'+(authMode==='register'?'register':'login'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    let data={}; try{data=await r.json();}catch{}
    if(!r.ok) throw new Error(data.error||'تعذر الاتصال بالخادم. تأكد أن Backend يعمل.');
    localStorage.setItem('m5kToken',data.token); localStorage.setItem('m5kPlayerName',data.user.username); updateAccountUI(); msg.textContent='تم بنجاح ✅'; setTimeout(()=>show('home'),500);
  }catch(e){msg.textContent=(e instanceof TypeError?'⚠️ تعذر الاتصال بالخادم. شغّل Backend ثم افتح http://localhost:3000':e.message);msg.style.color='#fb7185';}
}
function updateAccountUI(){
  const token=localStorage.getItem('m5kToken'); const status=el('accountStatus'), btn=document.querySelector('.account-btn');
  if(token){ const n=localStorage.getItem('m5kPlayerName')||'لاعب'; if(status) status.textContent='👤 '+n; if(btn){btn.textContent='تسجيل الخروج';btn.onclick=logout;}}
  else {if(status) status.textContent='زائر';if(btn){btn.textContent='تسجيل الدخول';btn.onclick=()=>openAuth('login');}}
}
function logout(){localStorage.removeItem('m5kToken');updateAccountUI();}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[ch]));
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("m5kPlayerName") || "";
  if(el("playerName")) el("playerName").value = saved;
  updateHintButton();
  updateAccountUI();
  refreshFriendsLive();
  setInterval(refreshFriendsLive, 3000);
  window.addEventListener("beforeunload", leaveFriendsHeartbeat);
});
