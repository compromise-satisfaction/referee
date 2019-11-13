
var Rewind = 0;
var Skip = 0;
var Before = 0;
var After = 0;
var Datas = [];
var Flag = ["女","主人公","女",1,1,21,10,"0乙0",true,false,false,false,false,false,false,false];
//3早戻し,4本線,5先送り,6体力,7ページ,8オートセーブ,9おまけ裁判,10選択音,11トロフィー音,12アイテム音,13異議あり!音,14待った！音;
var Item_Flag = [];//所持アイテム
var Character_Flag = [];//人物
var Pages = 0;//アイテムのページ
var Pages2 = 0;//人物のページ
T_Name = "";
Text = "";
var Scene_type = "メイン";
var Scene_kazu = 1;
var Get = false;

function have(Item){
  for (var i = 0; i < Item_Flag.length; i++) {
    if(Item_Flag[i][0]==Item) return(true);
  }
  for (var i = 10; i < Flag.length; i++) {
    if(Flag[i]==Item) return(true);
  }
  return(false);
}

function Save(Number){
  Flag[7] = Pages+"乙"+Pages2;
  window.localStorage.setItem("Flag",Flag);
  window.localStorage.setItem("Datas",Datas);
  window.localStorage.setItem("Number",Number);
  var Item_Flag2 = [];
  for (var i = 0; i < Item_Flag.length; i++) {
    Item_Flag2[i] = Item_Flag[i] + "端";
  }
  if(Item_Flag2==[]) Item_Flag2 = [[]+"端"]
  window.localStorage.setItem("Item",Item_Flag2);
  var Character_Flag2 = [];
  for (var i = 0; i < Character_Flag.length; i++) {
    Character_Flag2[i] = Character_Flag[i] + "端";
  }
  if(Character_Flag2==[]) Character_Flag2 = [[]+"端"]
  window.localStorage.setItem("Character",Character_Flag2);
  window.localStorage.setItem("syoken",false);
  var Flag2 = [];
  var k = 0;
  for (var i = 15; i < Flag.length; i++) {
    Flag2[k] = Flag[i];
    k++;
  }
  console.log(Flag2);
}//セーブ

function rand(n) {
  return Math.floor(Math.random() * (n + 1));
}

function R_S(Number,skip){
  Flag[3] = Number;
  Flag[5] = skip;
  Rewind = 0;
  Skip = skip;
  Before = 0;
  return;
}

function Get_I_C_F(Get_Type,a,b,c,d,e){
  if(Get) return;
  if(Get_Type=="人物"){
    for (var i = 0; i < Character_Flag.length; i++) {
      if(Character_Flag[i][0]==a) break;
    }
    if(b=="消失"){
      Character_Flag[i] = false;
      var Character_Flag2 = [];
      k = 0;
      for (var i = 0; i < Character_Flag.length; i++){
        if(Character_Flag[i]){
          Character_Flag2[k] = Character_Flag[i];
          k++;
        }
      }
      Character_Flag = Character_Flag2;
      if(Pages2==Character_Flag.length) Pages2-=5;
    }
    else if(b=="書き換え") Character_Flag[i][0] = c;
    else Character_Flag[i] = [a,b,c];
  }
  else if(Get_Type=="フラグ"){
    for (var i = 0; i < Flag.length; i++){
      if(Flag[i]==a) return;
    }
    Flag[Flag.length] = a;
  }
  else{
    for (var i = 0; i < Item_Flag.length; i++) {
      if(Item_Flag[i][0]==a) break;
    }
    if(b=="消失"){
      Item_Flag[i] = false;
      var Item_Flag2 = [];
      k = 0;
      for (var i = 0; i < Item_Flag.length; i++){
        if(Item_Flag[i]){
          Item_Flag2[k] = Item_Flag[i];
          k++;
        }
      }
      Item_Flag = Item_Flag2;
      if(Pages==Item_Flag.length) Pages-=5;
    }
    else if(b=="書き換え") Item_Flag[i][0] = c;
    else Item_Flag[i] = [a,b,c,d,e];
  }
  return;
}//アイテム関連

function Default(Item){
  T_Name = "";
  if(Item.substring(0,5)=="つきつける"){
    Text = "反応がない。";
  }
  else Text = "ここでは使えないようだ。";
  if(Scene_type == "メイン"){
    Datas[1] = 0;
    Datas[3] = 0;
    Datas[5] = 0;
    Datas[7] = 0;
    Datas[8] = "";
    Datas[9] = Text;
    Datas[10] = 0;
    Datas[11] = 0;
    Datas[12] = 0;
    Datas[13] = Flag[4];
    Datas[14] = 0;
  }
  if(Scene_type == "チョイス"){
    var Datas2 = [];
    Datas2[0] = Datas[0];
    Datas2[1] = 0;
    Datas2[2] = Datas[1];
    Datas2[3] = 0;
    Datas2[4] = Datas[2];
    Datas2[5] = 0;
    Datas2[6] = Datas[3];
    Datas2[7] = 0;
    Datas2[8] = "";
    Datas2[9] = Text;
    Datas2[10] = 0;
    Datas2[11] = 0;
    Datas2[12] = 0;
    Datas2[13] = Flag[4];
    Datas2[14] = 0;
    Datas = Datas2;
  }
  Scene_type = "メイン";
  return;
}

function Scene_loads2(Number,Item,get){
  var Name = Flag[0];
  var Gender = Flag[2];
  var Surname = Flag[1];
  if(Gender=="男"){
    var www = ["僕","俺"];
    var Person = www[rand(1)];
    var S_image = 1;
  }
  else{
    var Person = "私";
    var S_image = 2;
  }
  if(Item){//ココを変えるつきつけ、使用。
    console.log(Item,Number);
    switch (Item) {
      case "つきつけるりんご":
      switch (Number) {
        case 20094:
        Number = Item+Number;
          R_S(Number,20094);
          T_Name = "まどか";
          Text = "「あ、りんご。ちょうど今小腹が空いてるんですよね。」";
          After = Number+"_2";
          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",3];
          Scene_type = "アイテム";
          break;
        default:
        Default(Item);
        break;
      }
      break;
      case "つきつける弁護士バッジ":
      switch (Number) {
        case 20094:
        Number = Item+Number;
          R_S(Number,20094);
          T_Name = "まどか";
          Text = "「あ、それ。さっきスミレ先輩にも見せてましたね。」";
          After = Number+"_2";
          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",1];
          Scene_type = "アイテム";
          break;
        case 20009:
          Number = Item+Number;
          R_S(Number,Number+"_3");
          T_Name = "聖ヶ丘";
          Text = "「お？つきつけるかい？(改行) あの噂は本当だったんだな。」";
          After = Number+"_2";
          Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,15",1];
          Scene_type = "アイテム";
          break;
        default:
        Default(Item);
        break;
      }
      break;
      default:
        Default(Item);
        break;
    }
    return;
  }//ココを変えるつきつけ、使用。
  Rewind = Flag[3];
  Skip = Flag[5];
  Before = Number-1;
  After = Number+1;
  if(Rewind==Before) Rewind = 0;
  if(Skip==After) Skip = 0;
  switch (Number) {//ココを変えるScene
    case "タイトルに戻る":
      Scene_type = Number;
      break;
    case "使う反応なし":
      Scene_type = "メイン";
      break;
    case "ゲームオーバー":
      Datas = ["stand",0,0,0,"タイトルに戻る","セーブ読み込み",0,0,"タイトルに戻る","セーブ読み込み",0,0,0,0,Number];
      if(Flag[8]) Datas[5] = 0;
      Scene_type = "チョイス";
      break;
    case -1:
      Text = "自力でやれ。";
      Datas = ["Black",0,0,0,0,0,0,0,"",Text,0,0,0,"ゲームオーバー",0];
      Scene_type = "メイン";
      break;
    case 1:
      Data = true;
      Item_Flag = [];
      Character_Flag = [];
      var C1 = "第一話(未完成)";
      var C2 = "第二話(未完成)";
      var C3 = 0;
      var C4 = 0;
      var S1 = 1.1;
      var S2 = 20001;
      var S3 = 0;
      var S4 = 0;
      Rewind = 0;
      Number = 0;
      var Flag2 = [];
      Flag2[0] = Flag[0];
      Flag2[1] = Flag[1];
      Flag2[2] = Flag[2];
      Flag2[8] = Flag[8];
      Flag2[9] = Flag[9];
      Flag2[10] = Flag[10];
      Flag2[11] = Flag[11];
      Flag2[12] = Flag[12];
      Flag2[13] = Flag[13];
      Flag2[14] = Flag[14];
      Flag = Flag2;
      Flag[6] = 10;
      Datas = ["Black",0,0,0,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
      Scene_type = "チョイス";
      break;
    case 1.1:
      R_S(Number,31);
      Get_I_C_F("アイテム","弁護士バッジ",Person+"の身分を(改行)証明してくれる、(改行)大切なバッジだ。",1);
      Rewind = 0;
      T_Name = "";
      Text = Person+"の名前は"+ Surname + " " + Name +"。(改行)最近弁護士になったばかりの新入りだ。";
      After = 2;
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 2:
      Before = 1.1;
      Rewind = 0;
      T_Name = "";
      Text = "まだ先輩についての見習いに過ぎないがいずれは(改行)自分自身で法廷に立つことを目標にして(改行)聖ヶ丘法律事務所にお世話になって(改行)色々な慣例等を学びつつ日々の雑務をこなしている。";
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 3:
      T_Name = Surname+" "+Name;
      Text = "「おはようございます」";
      Datas = [1,0,S_image,15,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 4:
      T_Name = "";
      Text = "事務所の扉を開け、中にいる人物に挨拶する。";
      Datas = [1,0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 5:
      T_Name = "聖ヶ丘 剣哉";
      Text = "「ああ、おはよう"+Surname+"くん」";
      Datas = [1,0,S_image,0,0,0,4,15,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 6:
      T_Name = "";
      Text = "机に座り書類を処理しながら反応するのは男性にしては(改行)長めの髪型をした壮年の男性ー(改行)"+Person+"がお世話になっているこの法律事務所の所長、(改行)聖ヶ丘 剣哉 だ";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 7:
      T_Name = Name;
      Text = "「所長、"+Person+"に用件があるとお聞きしたのですが(改行) 一体何の御用でしょう？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 8:
      T_Name = "";
      Text = "所長のデスクに近づき質問をぶつけると(改行)所長は書類から顔をあげ腕を口の前で構え(改行)眼光鋭く真剣な顔で答え始める。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 9:
      T_Name = "聖ヶ丘";
      Text = "「うむ、その前に(改行) 埼律君の担当していた事件は知っているかね？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 10:
      T_Name = Name;
      Text = "「はい、"+Person+"も先輩の手伝いで(改行) 資料を纏めていたので知ってはいますが」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 11:
      T_Name = "聖ヶ丘";
      Text = "「その事件の弁護を君にやってもらうことになった」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 12:
      T_Name = "";
      Text = "………………";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 13:
      T_Name = "";
      Text = "………………………………";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 14:
      T_Name = Name;
      Text = "「はい？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 15:
      T_Name = "";
      Text = "思わず気の抜けた返事がでてしまう。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 16:
      T_Name = "";
      Text = "ベテランの先輩の仕事をわざわざ新米の自分が(改行)横からかっさらうような事をなぜ任されるのか。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 17:
      T_Name = Name;
      Text = "「御言葉ですが……(改行) その、先輩はどうなさったのですか？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 18:
      T_Name = "聖ヶ丘";
      Text = "「驚くのも無理はないが、(改行) 彼女は先日入院してしまってね」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 19:
      T_Name = Name;
      Text = "「入院！？何があったのですか！？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20:
      T_Name = "";
      Text = "あの健啖家で剛健な埼律先輩が(改行)入院するなんてよっぽどの事故か病気か。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 21:
      T_Name = "聖ヶ丘";
      Text = "「ああ、そんなに心配する事はないよ。(改行) ただの食べ過ぎによる急性胃腸炎だそうだ」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 22:
      T_Name = "";
      Text = "そう言って所長は全く困ったものだと(改行)額に手をあてため息をつく。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 23:
      T_Name = Name;
      Text = "(ああ、なるほどそう言えば週末(改行) わんこそばに挑戦するとかいってたけど(改行) そんなになるまで食べるとは……)";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 24:
      T_Name = "聖ヶ丘";
      Text = "「他のメンバーも全員出払っていて(改行) 手の空いているのが君しかいないのだよ。(改行) 君はこの事件のあらましも知っていることだし(改行) 引き受けてくれないか？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 25:
      T_Name = Name;
      Text = "「確かに少しは知っておりますが、(改行) その、宜しいのですか？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 26:
      T_Name = "";
      Text = "夢にまでみた法廷デビューが(改行)こんな形で転がって来たものの(改行)不安を隠せず問い返してしまう。";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 27:
      T_Name = "聖ヶ丘";
      Text = "「気にすることはないよ。(改行) 君は優秀だと聞いているし私の聞いたところこの事件、(改行) 勝そうだ。それに後のことは此方で(改行) キッチリフォローするから思うようにやってみたまえ」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 28:
      T_Name = Name;
      Text = "「わ、判りました。(改行) それでは準備に取りかかりますので失礼いたします」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 29:
      T_Name = "";
      Text = "所長の剣幕に押され(改行)了承してしまった"+Person+"は一礼し所長室を後にする。";
      Datas = [1,0,S_image,-15,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 30:
      T_Name = "";
      Text = "さて、これからどうするか……";
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 31:
      R_S(Number,31);
      var C1 = "資料を洗い直す";
      var C2 = "容疑者に会いに行く";
      var C3 = "先輩のお見舞いに行く";
      var C4 = "尋問テスト";
      var S1 = 32;
      var S2 = 33;
      var S3 = 34;
      var S4 = 35;
      if(have("事件概要")){//事件概要を所持しているかどうか
        C1 = "容疑者に会いに行く";
        C2 = "先輩のお見舞いに行く";
        C3 = "尋問テスト";
        C4 = 0;
        S1 = 33;
        S2 = 34;
        S3 = 35;
        S4 = 0;
      }
      Datas = ["Black",0,0,0,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
      Scene_type = "チョイス";
      break;
    case 32:
      Get_I_C_F("アイテム","事件概要","被害者は清水 久太郎 しみず きゅうたろう(改行)27歳 会社員(改行)死因はアレルギー性ショック症状による心停止(改行)蕎麦アレルギー持ち",2,"詳細",0);
      Scene_type = [2,"事件概要を法廷記録にファイルした。",31];
      break;
    case 33:
      T_Name = "";
      if(have("事件概要")){//事件概要を所持しているかどうか
        R_S(Number,1000);
        Text = "容疑者に会いに行こう。";
        Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,1000,Skip];
      }
      else {
        Text = "容疑者に合うにしても資料は必要だろう。";
        Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,0,0,0,31,0];
      }
      Scene_type = "メイン";
      break;
    case 34:
      T_Name = "";
      Text = "……あの先輩だ。必要ないだろう。";
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,0,0,0,31,0];
      Scene_type = "メイン";
      break;
    case 35:
      R_S(Number,82);
      T_Name = "";
      Text = "尋問のテストを開始する！";
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 36:
      T_Name = "裁判長";
      Text = "「これより、テスト裁判を開始します。」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 37:
      T_Name = Name;
      Text = "「弁護側、準備完了しております。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 38:
      T_Name = "？？？";
      Get_I_C_F("人物","未知の決闘者","遊☆戯☆王 THE DARK SIDE OF DIMENSIONSの(改行)前日談に海馬と戦った決闘者。(改行)前日談はもう読めないので知名度が低そう。(改行)スタイルがいいがこれはアバターである。",2);
      Text = "「検察側、準備完了していません。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 39:
      T_Name = Name;
      Text = "「はい？」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 40:
      T_Name = "";
      Text = "思わず気の抜けた返事がでてしまう。";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 41:
      T_Name = "？？？";
      Text = "「仕方ないでしょう。(改行) ストーリーの進行が遅いのだから。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 42:
      T_Name = Name;
      Text = "「はぁ…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 43:
      T_Name = "裁判長";
      Text = "「仕方ありませぬな。」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 44:
      T_Name = "裁判長";
      Text = "「仕方ありませぬな。(改行) 検察側は適当に過ごしておくように。」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 45:
      T_Name = Name;
      Text = "「…。」(改行)(いいのか？そんなので。)";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 46:
      T_Name = "？？？";
      Text = "「いいのよ。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 47:
      T_Name = "？？？";
      Text = "「いいのよ。(改行) 本編逆転裁判だって実質証人との対決だしね。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 48:
      T_Name = Name;
      Text = "「そうですかね…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 49:
      T_Name = "裁判長";
      Text = "「では、検事殿。最初で最後の証人の召喚を。」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 50:
      T_Name = Name;
      Text = "「\"最後の\"は余計ですよ…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 51:
      T_Name = "";
      Text = "";
      Get_I_C_F("人物","セラ","ホント可愛い藍神ィ…の妹。(改行)未知の決闘者の中身。(改行)遊戯王デュエルリンクスでプレイできるぞ。(改行)さあ、今すぐインストール！",3);
      Datas = ["stand",0,0,0,6,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 52:
      T_Name = "？？？";
      Text = "「では、証人。名前と職業を。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 53:
      T_Name = "？？？";
      Text = "「黙秘します。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 54:
      T_Name = "？？？";
      Text = "「は。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 55:
      T_Name = "？？？";
      Text = "「あなただって、名前欄【？？？】じゃないですか。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 56:
      T_Name = "？？？";
      Text = "「あなただって、名前欄【？？？】じゃないですか。(改行) それに、逆転裁判1でのみ御剣検事は(改行) 証人に名前を聞くのが苦手って設定があるんですよ。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 57:
      T_Name = "？？？";
      Text = "「そんな感じがしない2,3が発売された後の(改行) 蘇る逆転でも何故かあるっぽい謎の設定です。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 58:
      T_Name = "？？？";
      Text = "「関係ないでしょうそんなこと…。(改行) まあ人物欄はあるしいいか。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 59:
      T_Name = "裁判長";
      Text = "「はて、蘇る逆転は2,3の後でしたかな？」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 60:
      T_Name = "？？？";
      Text = "「たぶんそうよ。自信はないけどね。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 61:
      T_Name = "？？？";
      Text = "「たぶんそうよ。自信はないけどね。(改行) 根拠としては3に出てくる店のチラシがでてくるわ。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 62:
      T_Name = "？？？";
      Text = "「ふーん。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 63:
      T_Name = "？？？";
      Text = "「ふーん。(改行) とりあえず尋問しましょうか。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 64:
      T_Name = Name;
      Text = "「こんな小さい子に尋問するんですか？」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 65:
      T_Name = "？？？";
      Text = "「画像の数が乏しいのよ。仕方ないでしょう？」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 66:
      T_Name = "？？？";
      Text = "「そういう事です。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 67:
      T_Name = "？？？";
      Text = "「そういう事です。 ふふ。」";
      Datas = ["stand",0,0,0,7,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 68:
      Scene_type = "異議あり！69";
      break;
    case 69:
      T_Name = Name;
      Text = "「今あなたウインクしたじゃないですか！(改行) そんな画像が用意できるなら…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,67,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 70:
      Scene_type = "異議あり！71";
      break;
    case 71:
      T_Name = "？？？";
      Text = "「そんなの作者の趣味でしょう？」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,69,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 72:
      T_Name = "？？？";
      Text = "「そんなの作者の趣味でしょう？(改行) 事件には関係ないわ！」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 73:
      T_Name = Name;
      Text = "「…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 74:
      T_Name = Name;
      Text = "「…。異議ありの声一種類しかないんですね。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 75:
      T_Name = "？？？";
      Text = "「面倒だからね。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 76:
      T_Name = "？？？";
      Text = "「面倒だからね。サーバルちゃんの(改行) \"すっごーい\"なら用意してもいいわよ。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 77:
      T_Name = "サーバル";
      Get_I_C_F("人物","サーバル","ジャンプ力ぅ…ですかねぇ…(改行)高いところに、スッと、(改行)ジャンプできる動物でして、(改行)結構高いところが好きなので。",1);
      Text = "「すっごーい！」";
      Datas = ["stand",0,0,0,8,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "すっごーい！";
      break;
    case 78:
      T_Name = "？？？";
      Text = "「今ので無駄に5行費やしたわ。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 79:
      T_Name = Name;
      Text = "「…後で削除しといてください。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 80:
      T_Name = "？？？";
      Text = "「はいよ～。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "はいよ～";
      break;
    case 81:
      T_Name = Name;
      Text = "「…。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 82:
      T_Name = "";
      Get_I_C_F("人物","未知の決闘者","遊☆戯☆王 THE DARK SIDE OF DIMENSIONSの(改行)前日談に海馬と戦った決闘者。(改行)前日談はもう読めないので知名度が低そう。(改行)スタイルがいいがこれはアバターである。",2);
      Get_I_C_F("人物","セラ","ホント可愛い藍神ィ…の妹。(改行)未知の決闘者の中身。(改行)遊戯王デュエルリンクスでプレイできるぞ。(改行)さあ、今すぐインストール！",3);
      Text = "尋問開始";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,0];
      Scene_type = "メイン";
      break;
    case 83:
      T_Name = "？？？";
      Text = "「まず、被害者は溺死ですね。」";
      Datas = [6,T_Name,Text,83.1,0,Number,After,87,"事件概要"];
      Scene_type = "尋問";
      break;
    case 83.1:
      R_S(Number,84);
      T_Name = Name;
      Text = "「あれ？そうでしたっけ？」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,83.2,Skip];
      Scene_type = "メイン";
      break;
    case 83.2:
      T_Name = "？？？";
      Text = "「私も自信ないですね。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,0,83.1,Number,83.3,Skip];
      Scene_type = "メイン";
      break;
    case 83.3:
      T_Name = Name;
      Text = "(仕方ない。資料を見るか…)";
      if(have("事件概要")) After = 84;//事件概要所持してたら
      else After = 83.4;
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,83.2,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 83.4:
      T_Name = Name;
      Text = "(って資料がないぞ！…どうしよう？)";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,83.3,Number,83.5,Skip];
      Scene_type = "メイン";
      break;
    case 83.5:
      var C1 = "続ける";
      var C2 = "出直す";
      var C3 = 0;
      var C4 = 0;
      var S1 = 84;
      var S2 = 31;
      var S3 = 0;
      var S4 = 0;
      Datas = ["left",S_image,0,0,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,83.4,Number];
      Scene_type = "チョイス";
      break;
    case 84:
      T_Name = "？？？";
      Text = "「後は特にないですね。」";
      Datas = [6,T_Name,Text,84.1,Before,Number,After,0,"無"];
      Scene_type = "尋問";
      break;
    case 84.1:
      R_S(Number,85);
      T_Name = Name;
      Text = "「短いですね。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,84.2,Skip];
      Scene_type = "メイン";
      break;
    case 84.2:
      T_Name = "？？？";
      Text = "「テストですからね。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,0,84.1,Number,85,0];
      Scene_type = "メイン";
      break;
    case 85:
      T_Name = "？？？";
      Text = "「以上です。」";
      Datas = [6,T_Name,Text,85.1,Before,Number,After,0,"無"];
      Scene_type = "尋問";
      break;
    case 85.1:
      R_S(Number,86);
      T_Name = Name;
      Text = "「もっとないんですか？」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,85.2,Skip];
      Scene_type = "メイン";
      break;
    case 85.2:
      T_Name = "？？？";
      Text = "「ないです。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,0,85.1,Number,86,0];
      Scene_type = "メイン";
      break;
    case 86:
      T_Name = Name;
      Text = "(エライ短い証言だな…。)";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,Number,83,0];
      Scene_type = "メイン";
      break;
    case 87:
      R_S(Number,95);
      T_Name = Name;
      Text = "「事件概要によると。死因はアレルギーです。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"1000,0250,15",2];
      Scene_type = "メイン";
      break;
    case 88:
      T_Name = "？？？";
      Text = "「そうですか。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 89:
      T_Name = "？？？";
      Text = "「そうですか。ということは。」";
      Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 90:
      T_Name = "裁判長";
      Text = "「被告人は無罪ということですな！」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 91:
      T_Name = Name;
      Text = "「え。」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 92:
      T_Name = "？？？";
      Text = "「いいんじゃない？」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 93:
      T_Name = "？？？";
      Text = "「いいんじゃない？これはテストなんだし。」";
      Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 94:
      T_Name = "裁判長";
      Text = "「被告人は無罪！」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 95:
      T_Name = "ゲームクリア！";
      Text = "(完成まで待ってね)";
      After = "ゲームオーバー";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,0];
      Scene_type = "メイン";
      break;
    case 20001:
      R_S(Number,20009);
      Get_I_C_F("アイテム","弁護士バッジ",Person+"の身分を(改行)証明してくれる、(改行)大切なバッジだ。",1);
      T_Name = "1月4日";
      Text = "聖ヶ丘法律事務所";
      Datas = [1,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20002:
      T_Name = "埼律 美智子";
      Text = "「いやー、おせちにお雑煮、(改行) お正月は美味しいものがたくさんあってまいるねぇ」";
      Datas = [1,0,S_image,15,0,0,10,15,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20003:
      T_Name = Name;
      Text = "「先輩…食べ過ぎて鏡餅みたいになるくらいなら(改行) 結構ですけど、前みたいなことはゴメンですよ？」";
      Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20004:
      T_Name = Name;
      Text = "「初めての裁判が殺人事件で(改行) こっちは大変だったんですから。」";
      Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20005:
      T_Name = "美智子";
      Text = "「まあまあ。(改行) でも、初めてであんな裁判をやってのけたんだから(改行) これから依頼がわんさかくるんじゃない？」";
      Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20006:
      T_Name = Name;
      Text = "「まさか。そんな単純に(改行) 行くわけないじゃないですか。」";
      Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20007:
      T_Name = "聖ヶ丘";
      Text = "「いや。それがそうでもないぞ。」";
      Datas = [1,0,S_image,0,0,0,4,15,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20008:
      T_Name = Name;
      Text = "「えっ？」";
      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case 20009:
      R_S(20001,Number);
      var C1 = "話す";
      var C2 = "調べる";
      var C3 = "移動する";
      var C4 = "つきつける";
      var S1 = 20010;
      var S2 = 0;
      var S3 = 20022;
      var S4 = 0;
      Rewind = 20001;
      Before = 20008;
      Datas = [1,S_image,0,4,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
      Scene_type = "チョイス";
      break;
      case "調べる20009ゴミ箱":
        R_S(Number,"調べる");
        T_Name = Name;
        Text = "「先輩の食べたおやつのゴミで散らかっている。」";
        After = "調べる20009ゴミ箱2";
        Datas = [1,0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "調べる20009ゴミ箱2":
        T_Name = "美智子";
        Text = "「ちょっと！私だけのせいにしないでよ！」";
        Rewind = 0;
        Before = "調べる20009ゴミ箱";
        After = "調べる20009ゴミ箱3";
        console.log(Skip);
        Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "調べる20009ゴミ箱3":
        T_Name = "聖ヶ丘";
        Text = "「そういえば、私はそのゴミ箱を使っていないな。」";
        Before = "調べる20009ゴミ箱2";
        After = "調べる20009ゴミ箱4";
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case "調べる20009ゴミ箱4":
          T_Name = Name;
          Text = "「"+Person+"もです。」";
          Before = "調べる20009ゴミ箱3";
          After = "調べる20009ゴミ箱5";
          Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
      case "調べる20009ゴミ箱5":
        T_Name = "美智子";
        Text = "「………」";
        Before = "調べる20009ゴミ箱4";
        After = Skip;
        Skip = 0;
        Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009":
        R_S(Number,"つきつける弁護士バッジ20009_3");
        T_Name = "聖ヶ丘";
        Text = "「お？つきつけるかい？(改行) あの噂は本当だったんだな。」";
        After = "つきつける弁護士バッジ20009_2";
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_2":
        T_Name = "美智子";
        Text = "「噂って？」";
        Rewind = 0;
        Before = "つきつける弁護士バッジ20009";
        After = "つきつける弁護士バッジ20009_3";
        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_3":
        Before = "つきつける弁護士バッジ20009_2";
        var C1 = "ああ！";
        var C2 = Person+"も知らないです。";
        var C3 = "ある人の身の上や物事についての確実でない話。";
        var C4 = 0;
        var S1 = "つきつける弁護士バッジ20009_4";
        var S2 = "つきつける弁護士バッジ20009_5";
        var S3 = "つきつける弁護士バッジ20009_6";
        var S4 = 0;
        Datas = [1,10,0,S_image,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
        Scene_type = "チョイス";
        break;
      case "つきつける弁護士バッジ20009_4":
        R_S(Number,20009);
        T_Name = Name;
        Text = "「ああ！」";
        After = "つきつける弁護士バッジ20009_4.1";
        Datas = [1,0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_4.1":
        T_Name = "聖ヶ丘";
        Text = "「それってハネクリボー？」";
        Rewind = 0;
        Before = "つきつける弁護士バッジ20009_4";
        After = "つきつける弁護士バッジ20009_4.2";
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_4.2":
        T_Name = "美智子";
        Text = "「…は？」";
        Before = "つきつける弁護士バッジ20009_5.1";
        After = 20009;
        Skip = 0;
        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_5":
        R_S(Number,20009);
        T_Name = "聖ヶ丘";
        Text = "「弁護士バッジをつきつけたがる弁護士は優秀(改行) っていう噂だよ。」";
        After = "つきつける弁護士バッジ20009_5.1";
        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_5.1":
        T_Name = "美智子";
        Text = "「へー。じゃあ私もやってみようかな。」";
        Rewind = 0;
        Before = "つきつける弁護士バッジ20009_5";
        After = "つきつける弁護士バッジ20009_5.2";
        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_5.2":
        T_Name = Name;
        Text = "(その前に先輩は弁護士バッジを(改行) もっと綺麗にした方がいいと思うが…)";
        Before = "つきつける弁護士バッジ20009_5.1";
        After = 20009;
        Skip = 0;
        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_6":
        R_S(Number,20009);
        T_Name = Name;
        Text = "「ある人の身の上や、(改行) 物事についての確実でない話のことですよ。」";
        After = "つきつける弁護士バッジ20009_6.1";
        Datas = [1,0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_6.1":
        T_Name = "美智子";
        Text = "「わかってるよ そんなこと…」";
        Rewind = 0;
        Before = "つきつける弁護士バッジ20009_6";
        After = "つきつける弁護士バッジ20009_6.2";
        Datas = [1,0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "つきつける弁護士バッジ20009_6.2":
        T_Name = "聖ヶ丘";
        Text = "「弁護士バッジをつきつけたがる弁護士は優秀(改行) っていう噂だったんだが…嘘かもしれないな。」";
        Before = "つきつける弁護士バッジ20009_6.1";
        After = 20009;
        Skip = 0;
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case 20010:
        var C1 = "依頼について";
        var C2 = 0;
        var C3 = 0;
        var C4 = 0;
        var S1 = 20011;
        var S2 = 20016;
        var S3 = 0;
        var S4 = 0;
        if(have("依頼について")){
          C1 += " ✓";
          C2 = "依頼人について";
        }
        if(have("依頼人について")) C2 += " ✓";
        Rewind = 0;
        Before = 20009;
        Datas = [1,S_image,0,4,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
        Scene_type = "チョイス";
        break;
      case 20011:
        R_S(Number,20010);
        Get_I_C_F("フラグ","依頼について");
        T_Name = Name;
        Text = "「所長、そうでもないとはどういうことですか？」";
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case 20012:
          T_Name = "聖ヶ丘";
          Text = "「ああ、実はな"+Surname+"君。(改行) 君に弁護の依頼が来ているのだ。」";
          Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
        case 20013:
          T_Name = Name;
          Text = "えっ。本当ですか？";
          Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20014:
            T_Name = "美智子";
            Text = "「ホラホラ。私の言った通りじゃん。」";
            Datas = [1,0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
          case 20015:
            T_Name = "聖ヶ丘";
            Text = "「それで依頼人のことなんだがな」";
            After = Skip;
            Skip = 0;
            Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case 20016:
            R_S(Number,20010);
            Get_I_C_F("フラグ","依頼人について");
              T_Name = "聖ヶ丘";
              Text = "「依頼人は瀬名 翼というらしい。(改行) 君の友人だそうだね？」";
              Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
              case 20017:
                T_Name = Name;
                Text = "「なんですって！？ 瀬名の奴が！？」";
                Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                Scene_type = "メイン";
                break;
                case 20018:
                  T_Name = "聖ヶ丘";
                  Text = "「留置所で待ってるそうだから、(改行) 詳しい話は本人に聞くといい。」";
                  Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                  Scene_type = "メイン";
                  break;
                  case 20019:
                    T_Name = Name;
                    Text = "「わかりました。」";
                    Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                    Scene_type = "メイン";
                    break;
                    case 20020:
                      T_Name = "聖ヶ丘";
                      Text = "「それと、今回の事件は難しいだろうから、(改行) 埼律君もサポートを頼むよ。」";
                      Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                      Scene_type = "メイン";
                      break;
                      case 20021:
                        T_Name = "美智子";
                        Text = "「りょーかいでーす。」";
                        After = Skip;
                        Skip = 0;
                        Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                        Scene_type = "メイン";
                        break;
      case 20022:
        var C1 = "留置所";
        var C2 = 0;
        var C3 = 0;
        var C4 = 0;
        var S1 = 20023;
        var S2 = 0;
        var S3 = 0;
        var S4 = 0;
        Rewind = 0;
        Before = 20009;
        Datas = [1,S_image,0,4,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
        Scene_type = "チョイス";
        break;
      case 20023:
        if(have("依頼人について")){//が達成済みなら
          R_S(Number,20094);
          T_Name = "1月4日 某時刻";
          Text = "留置所";
          Datas = ["留置所",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
        }
        T_Name = Name;
        Text = "(まずは所長の話を聞くべきだろう)";
        Rewind = 0;
        Before = 0;
        After = 20022;
        Skip = 0;
        Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case 20024:
          T_Name = "美智子";
          Text = "「おや？面会に沢山の(改行) 女の子が来てるみたいだね。」";
          Datas = ["留置所",0,10,15,0,0,S_image,15,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
            case 20025:
              T_Name = Name;
              Text = "「それに、何故かテレビカメラが何台かいますね。」";
              Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
              case 20026:
                T_Name = "美智子";
                Text = "「まあ、そんなことより瀬名さんって(改行) どんな人なのさ？」";
                Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                Scene_type = "メイン";
                break;
                case 20027:
                  T_Name = Name;
                  Text = "「中学の時の知り合いなんですが、(改行) その頃からドレスの作成に興味があって、(改行) 今では自分のブランドを持ってたと思いますよ。」";
                  Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                  Scene_type = "メイン";
                  break;
                  case 20028:
                    T_Name = "美智子";
                    Text = "「そうなんだ、すごいじゃん！(改行) ちなみに、なんてブランドなの？」";
                    Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                    Scene_type = "メイン";
                    break;
                    case 20029:
                      T_Name = Name;
                      Text = "「たしか…(改行) “Dreamy Crown”だったかな？」";
                      Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                      Scene_type = "メイン";
                      break;
                      case 20030:
                        T_Name = "美智子";
                        Text = "「え！？ドリーミークラウン！？(改行) それってあかりちゃんのドレスのブランドだよね！？(改行) "+Surname+"君そんなすごい人と友達だったの？」";
                        Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                        Scene_type = "メイン";
                        break;
                        case 20031:
                          T_Name = Name;
                          Text = "「そんなに知名度高いんですか？」";
                          Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                          Scene_type = "メイン";
                          break;
                          case 20032:
                            T_Name = "美智子";
                            Text = "「何言ってんのさ。(改行) 大空あかりちゃんと言えば(改行) スターライトクイーンだよ？」";
                            Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                            Scene_type = "メイン";
                            break;
                            case 20033:
                              T_Name = "美智子";
                              Text = "「君だって、”大空お天気”(改行) くらいはみたことがあるんじゃない？」";
                              Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                              Scene_type = "メイン";
                              break;
                              case 20034:
                                T_Name = Name;
                                Text = "「ああ。あの子ですか。」";
                                Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                Scene_type = "メイン";
                                break;
                                case 20035:
                                  T_Name = "美智子";
                                  Text = "「これは是が非でも無罪にして、(改行) お礼にドレスを作ってもらわないとね。」";
                                  Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                  Scene_type = "メイン";
                                  break;
                            case 20036:
                              T_Name = Name;
                              Text = "「あいつがそんなことするかな…。」";
                              Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                              Scene_type = "メイン";
                              break;
                              case 20037:
                                T_Name = "美智子";
                                Text = "「ところで、ドリーミークラウンのデザイナーさんは(改行) 人里離れた湖畔でデザインをしてるって(改行) テレビであかりちゃんが言ってたけど？」";
                                Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                Scene_type = "メイン";
                                break;
                                case 20038:
                                  T_Name = Name;
                                  Text = "「そうなんですよ。(改行) そんなに人付き合いをする奴でもなかったし、(改行) 一体何の罪で…。」";
                                  Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                  Scene_type = "メイン";
                                  break;
                                  case 20039:
                                    T_Name = "？？？";
                                    Text = "「おい。別に俺は捕まってないぞ。」";
                                    Datas = ["留置所",0,S_image,0,0,0,18,15,T_Name,Text,Rewind,Before,Number,After,Skip];
                                    Scene_type = "メイン";
                                    break;
                                    case 20040:
                                      T_Name = Name;
                                      Get_I_C_F("人物","瀬名 翼","Dreamy Crown のデザイナー。(改行)瀬名翼の画像をアップすると(改行)近い構図の春日が送られてくる(改行)Twitterが存在して笑った。",4)
                                      Text = "「あっ、瀬名。(改行) なんだ、てっきりお前が捕まったのかと思ったぞ。」";
                                      Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                      Scene_type = "メイン";
                                      break;
                                      case 20041:
                                        T_Name = "瀬名 翼";
                                        Text = "「ああ。今回捕まったのは知り合いのアイドルだ。」";
                                        Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                        Scene_type = "メイン";
                                        break;
                                        case 20042:
                                          T_Name = "美智子";
                                          Text = "「それはよかった。知り合いを弁護とか気が重いし(改行) "+Surname+"君がもし弁護に失敗しても(改行) ドリーミークラウンはなくならいないわけね。」";
                                          Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                          Scene_type = "メイン";
                                          break;
                                          case 20043:
                                            T_Name = Name;
                                            Text = "「それ、絶対依頼人に言わないでくださいよ…。」";
                                            Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                            Scene_type = "メイン";
                                            break;
                                case 20044:
                                  T_Name = "瀬名";
                                  Text = "「まあ、アイツならそんなこと気にしないだろうがな。」";
                                  Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                  Scene_type = "メイン";
                                  break;
                                  case 20045:
                                    T_Name = "美智子";
                                    Text = "「じゃあ、まずは被告人に面会したいところだけど…(改行) 人が多いわね。」";
                                    Datas = ["留置所",0,10,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                    Scene_type = "メイン";
                                    break;
                                case 20046:
                                  T_Name = "瀬名";
                                  Text = "「今、面会中の奴等は知り合いなんで、(改行) ちょっと声かけてきますよ。」";
                                  Datas = ["留置所",0,10,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                  Scene_type = "メイン";
                                  break;
                                  case 20047:
                                    T_Name = "瀬名";
                                    Text = "「おい、大空。」";
                                    Datas = ["留置所",0,18,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                    Scene_type = "メイン";
                                    break;
                                    case 20048:
                                      T_Name = "？？？";
                                      Text = "「あっ 瀬名さん！」";
                                      Datas = ["留置所",0,18,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
                                      Scene_type = "メイン";
                                      break;
                                      case 20049:
                                        T_Name = "？？？";
                                        Text = "「瀬名さんも、まどかちゃんの面会に来たんですか？」";
                                        Datas = ["留置所",0,18,0,0,0,20,15,T_Name,Text,Rewind,Before,Number,After,Skip];
                                        Scene_type = "メイン";
                                        break;
                                        case 20050:
                                          T_Name = "瀬名";
                                          Text = "「いや、俺じゃなくて 知り合いの弁護士だ。」";
                                          Datas = ["留置所",0,18,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                          Scene_type = "メイン";
                                          break;
                                          case 20051:
                                            T_Name = "？？？";
                                            Text = "「べんごし…？」";
                                            Datas = ["留置所",0,18,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                            Scene_type = "メイン";
                                            break;
                                            case 20052:
                                              T_Name = Name;
                                              Text = "「どうも。」";
                                              Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                              Scene_type = "メイン";
                                              break;
                                              case 20053:
                                                T_Name = Name;
                                                Text = "「どうも。(改行) 弁護士の"+Surname+" "+Name+"です。」";
                                                Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,15",1];
                                                Scene_type = "メイン";
                                                break;
                                                case 20054:
                                                  T_Name = "瀬名";
                                                  Text = "「お前は本当にそれを見せるのが好きだな…。」";
                                                  Datas = ["留置所",0,18,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                                  Scene_type = "メイン";
                                                  break;
                                                  case 20055:
                                                    T_Name = "？？？";
                                                    Text = "「あ。えっと…」";
                                                    Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                                    Scene_type = "メイン";
                                                    break;
                                                    case 20056:
        T_Name = "氷上 スミレ";
        Get_I_C_F("人物","氷上 スミレ","スターライト学園のアイドル。(改行)通称ステージに咲く氷の花。",6);
        Text = "「あ。えっと…(改行) 氷上 スミレです。」";
        Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,15",3];
        Scene_type = "メイン";
        break;
        case 20057:
          T_Name = Name;
          Text = "「りんご…？」";
          Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
          Scene_type = "メイン";
          break;
        case 20058:
          T_Name = "？？？";
          Text = "「スミレちゃん、前にタルト・タタンのステージで(改行) りんごを使うことになって、(改行) 慣れるためにいつも持ち歩いてたら(改行) 癖になっちゃったんです。」";
          Datas = ["留置所",0,S_image,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20059:
            T_Name = "？？？";
            Text = "「もうかれこれ半年は持ち歩いてますな。」";
            Datas = ["留置所",0,S_image,0,0,0,21,15,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case 20060:
        T_Name = "スミレ";
        Text = "「とは言ってもいつも新品のを持ち歩いてるんですよ。」";
        Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
        Scene_type = "メイン";
        break;
        case 20061:
    T_Name = "スミレ";
    Text = "「こっちも何か見せないとダメかな、と思ったので…。」";
    Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
    Scene_type = "メイン";
    break;
    case 20062:
T_Name = "スミレ";
Text = "「こっちも何か見せないとダメかな、と思ったので…。(改行) 良かったらどうぞ。」";
Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
Scene_type = "メイン";
break;
case 20063:
  T_Name = "瀬名";
  Text = "「こいつにそんな気を使わなくてもいいぞ。」";
  Datas = ["留置所",0,18,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
  Scene_type = "メイン";
  break;
  case 20064:
    T_Name = Name;
    Text = "「まあ、せっかくだし貰っておくよ。」";
    Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
    Scene_type = "メイン";
    break;
    case 20065:
    Get_I_C_F("アイテム","りんご","氷上 スミレから貰った。(改行)いつも持ち歩いているらしい。",3);
    Scene_type = [3,"りんごを受け取った。",20066];
    break;
    case 20066:
      T_Name = "美智子";
      Text = "「…本物のルミナスだ。」";
      Before = 20064;
      Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case 20067:
        T_Name = Name;
        Text = "「はい？」";
        Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case 20068:
        T_Name = "美智子";
        Text = "「ルミナスよ！ルミナス！」";
        Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case 20069:
          T_Name = "美智子";
          Text = "「ステージに咲く氷の花、氷上スミレちゃん！」";
          Datas = ["留置所",0,10,0,0,0,20,15,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20070:
          Get_I_C_F("人物","新条ひなき","スターライト学園のアイドル。(改行)モデルとしても活躍している。",7);
          T_Name = "美智子";
          Text = "「モデルとしても活躍している新条ひなきちゃん！」";
          Datas = ["留置所",0,10,0,0,0,21,15,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20071:
          T_Name = "美智子";
          Get_I_C_F("人物","大空あかり","スターライト学園のアイドル。(改行)スターライトクイーン。",5);
          Text = "「そして、スターライトクイーンの大空あかりちゃん！」";
          Datas = ["留置所",0,10,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20072:
          T_Name = "美智子";
          Text = "「そして、スターライトクイーンの大空あかりちゃん！(改行) さっき話したでしょ！」";
          Datas = ["留置所",0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20073:
          T_Name = "美智子";
          Text = "「この三人が組んでいるユニット。(改行) それがルミナスなのよ！」";
          Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20074:
            T_Name = "新条ひなき";
            Text = "「よろしくだぜ！」";
            Datas = ["留置所",0,10,0,0,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case 20075:
              T_Name = "美智子";
              Text = "「まさかこんなところで会えるなんで…(改行) でもいったいどうして？」";
              Datas = ["留置所",0,10,0,0,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
            case 20076:
            T_Name = "大空あかり";
            Text = "「実は、今回捕まったのが、私たちの後輩なんです…。」";
            Datas = ["留置所",0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case 20077:
              T_Name = "美智子";
              Text = "「え！？そういえばさっきまどかって…。(改行) じゃあ今回の依頼人って天羽まどかちゃん？」";
              Datas = ["留置所",0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
              case 20078:
              T_Name = "あかり";
              Text = "「あっ、はい。」";
              Datas = ["留置所",0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
              case 20079:
                T_Name = Name;
                Text = "「なるほど…被告人はアイドルか…。(改行) それであんなにテレビカメラがいるのか。」";
                Datas = ["留置所",0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                Scene_type = "メイン";
                break;
  case 20080:
    T_Name = Name;
    Text = "「けど留置所内ってそういう撮影許可されてたっけ…？」";
    Datas = ["留置所",0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
    Scene_type = "メイン";
    break;
    case 20081:
      T_Name = "美智子";
      Text = "「そんなことはどうでもよろしい。」";
      Datas = ["留置所",0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case 20082:
        T_Name = "美智子";
        Text = "「早くまどかちゃんを出してあげないと。(改行) まどかちゃんが犯人のはずがない。(改行) ファンならみんなそういうわ。」";
        Datas = ["留置所",0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
    case 20083:
      T_Name = "スミレ";
      Text = "「それがそうでもないみたいで…。」";
      Datas = ["留置所",0,10,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case 20084:
        T_Name = "美智子";
        Text = "「…。」";
        Datas = ["留置所",0,10,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case 20085:
          T_Name = "美智子";
          Text = "「…そう言われるとそんな気もするわね。」";
          Datas = ["留置所",0,10,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case 20086:
            T_Name = "美智子";
            Text = "「…そう言われるとそんな気もするわね。(改行) まどかちゃん天使系で売ってるけど(改行) 実際小悪魔系だし。」";
            Datas = ["留置所",0,10,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case 20087:
              T_Name = Name;
              Text = "(おいおい…。)";
              Datas = ["留置所",0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
              case 20088:
                T_Name = "？？？";
                Text = "「ちょっと！(改行) ひどいじゃないですか！」";
                Datas = ["留置所",0,10,0,22,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                Scene_type = "メイン";
                break;
                case 20089:
                  T_Name = "美智子";
                  Text = "「あ、まどかちゃんだ。可愛いね。サイン頂戴。」";
                  Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                  Scene_type = "メイン";
                  break;
                  case 20090:
                    T_Name = "天羽まどか";
                    Text = "「えっ。」";
                    Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                    Scene_type = "メイン";
                    break;
                    case 20091:
                      T_Name = "まどか";
                      Text = "「えっ。…はい！私可愛いですからね。」";
                      Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                      Scene_type = "メイン";
                      break;
                      case 20092:
                        T_Name = "まどか";
                        Text = "「サイン、どうぞ！」";
                        Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",4];
                        Scene_type = "メイン";
                        break;
                        case 20093:
                          T_Name = Name;
                          Text = "(怒っていたようだが、一瞬で機嫌が直ったな…。)";
                          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                          Scene_type = "メイン";
                          break;
                        case 20094:
Get_I_C_F("人物","瀬名 翼","Dreamy Crown のデザイナー。(改行)瀬名翼の画像をアップすると(改行)近い構図の春日が送られてくる(改行)Twitterが存在して笑った。",4)
Get_I_C_F("人物","大空あかり","スターライト学園のアイドル。(改行)スターライトクイーン。",5);
Get_I_C_F("人物","氷上 スミレ","スターライト学園のアイドル。(改行)通称ステージに咲く氷の花。",6);
Get_I_C_F("人物","新条ひなき","スターライト学園のアイドル。(改行)モデルとしても活躍している。",7);
for (var i = 1; i < 10; i++) {
Get_I_C_F("アイテム","りんご"+i,"氷上 スミレから貰った。(改行)いつも持ち歩いているらしい。",3);
}
Get_I_C_F("アイテム","りんご","氷上 スミレから貰った。(改行)いつも持ち歩いているらしい。",3);
                        Get_I_C_F("人物","天羽まどか","スターライト学園のアイドル。(改行)今回の事件の被告人。",8);
                        R_S(20023,Number);
                          var C1 = "話す";
                          var C2 = "調べる";
                          var C3 = "移動する";
                          var C4 = "つきつける";
                          var S1 = 20095;
                          var S2 = 0;
                          var S3 = 0;
                          var S4 = 0;
                          Rewind = 20023;
                          Before = 20093;
                          Datas = ["留置所",0,22,0,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
                          Scene_type = "チョイス";
                          break;
      case 20095:
      var C1 = "まどかのこと";
      var C2 = "被害者のこと";
      var C3 = "事件現場のこと";
      var C4 = "依頼の理由";
      var S1 = 0;
      var S2 = 0;
      var S3 = 0;
      var S4 = 0;
      Rewind = 0;
      Before = 20094;
      Datas = ["留置所",0,22,0,C1,C2,C3,C4,S1,S2,S3,S4,Rewind,Before,Number];
      Scene_type = "チョイス";
      break;
      case "つきつけるりんご20094":
        R_S(Number,20094);
        T_Name = "まどか";
        Text = "「あ、りんご。ちょうど今小腹が空いてるんですよね。」";
        After = Number+"_2";
        Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",3];
        Scene_type = "メイン";
        break;
        case "つきつけるりんご20094_2":
          T_Name = Name;
          Text = "「悪いけど、食物の差し入れは禁止されてるんだよね。」";
          Before = "つきつけるりんご20094";
          After = "つきつけるりんご20094_3";
          Rewind = 0;
          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,0",3];
          Scene_type = "メイン";
          break;
          case "つきつけるりんご20094_3":
            T_Name = "まどか";
            Text = "「じゃあ、なんで見せたんですか？」";
            Before = "つきつけるりんご20094_2";
            After = "つきつけるりんご20094_4";
            Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,0",3];
            Scene_type = "メイン";
            break;
            case "つきつけるりんご20094_4":
              T_Name = Name;
              Text = "「手に入れたアイテムは(改行) すぐ使ってみたくなる性分なもので。」";
              Before = "つきつけるりんご20094_3";
              After = "つきつけるりんご20094_5";
              Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,0",3];
              Scene_type = "メイン";
              break;
              case "つきつけるりんご20094_5":
                T_Name = Name;
                Text = "「ははぁ…。ゼルダ脳、って奴ですね。」";
                Before = "つきつけるりんご20094_4";
                After = Skip;
                Skip = 0;
                Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,0",3];
                Scene_type = "メイン";
                break;
      case "つきつける弁護士バッジ20094":
      R_S(Number,20094);
      T_Name = "まどか";
      Text = "「あ、それ。さっきスミレ先輩にも見せてましたね。」";
      After = "つきつける弁護士バッジ20094_2";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",1];
      Scene_type = "メイン";
      break;
      case "つきつける弁護士バッジ20094_2":
      T_Name = "美智子";
      Text = "「この行為には何の意味もないけどね。」";
      Rewind = 0;
      Before = "つきつける弁護士バッジ20094";
      After = "つきつける弁護士バッジ20094_3";
      Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "つきつける弁護士バッジ20094_3":
      T_Name = "美智子";
      Text = "「この行為には何の意味もないけどね。(改行) 見て弁護士バッジだってわかる人少ないし。」";
      Before = "つきつける弁護士バッジ20094_2";
      After = "つきつける弁護士バッジ20094_4";
      Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "つきつける弁護士バッジ20094_4":
      T_Name = Name;
      Text = "「いやいや。身分証とかはちゃんと使うべきですよ。」";
      Before = "つきつける弁護士バッジ20094_3";
      After = "つきつける弁護士バッジ20094_5";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "つきつける弁護士バッジ20094_5":
      T_Name = Name;
      Text = "「まどかちゃんはどう？(改行) 学生証とか、あんまり使ってないんじゃない？」";
      Before = "つきつける弁護士バッジ20094_4";
      After = "つきつける弁護士バッジ20094_6";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
    case "つきつける弁護士バッジ20094_6":
      T_Name = "まどか";
      Text = "「アイカツシステムの起動に必要なので、(改行) ライブのたびに使ってますね。」";
      Before = "つきつける弁護士バッジ20094_5";
      After = "つきつける弁護士バッジ20094_7";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "つきつける弁護士バッジ20094_7":
        T_Name = Name;
        Text = "「……そう。」";
        Before = "つきつける弁護士バッジ20094_6";
        After = Skip;
        Skip = 0;
        Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
    case "調べる20094ガラスの穴":
      R_S(Number,"調べる");
      T_Name = Name;
      Text = "「このガラスの穴って、結構重要なんだよな。」";
      After = "調べる20094ガラスの穴2";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
  case "調べる20094ガラスの穴2":
    T_Name = "まどか";
    Text = "「綺麗にあいてますよね、この穴。」";
    Rewind = 0;
    Before = "調べる20094ガラスの穴";
    After = "調べる20094ガラスの穴3";
    Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
    Scene_type = "メイン";
    break;
    case "調べる20094ガラスの穴3":
      T_Name = Name;
      Text = "「開ける道具とかがあるんじゃないかな？」";
      Before = "調べる20094ガラスの穴2";
      After = "調べる20094ガラスの穴4";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "調べる20094ガラスの穴4":
        T_Name = "美智子";
        Text = "「シールドマシンみたいな形をしてそうよね。」";
        Before = "調べる20094ガラスの穴3";
        After = "調べる20094ガラスの穴5";
        Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
      case "調べる20094ガラスの穴5":
        T_Name = "まどか";
        Text = "「…なんですか？それ。」";
        Before = "調べる20094ガラスの穴4";
        After = "調べる20094ガラスの穴6";
        Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case "調べる20094ガラスの穴6":
          T_Name = "美智子";
          Text = "「トンネルを掘る道具よ。(改行) わからなかったらすぐ調べなさい！(改行) 現代っ子の常識でしょう。」";
          Before = "調べる20094ガラスの穴5";
          After = "調べる20094ガラスの穴7";
          Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case "調べる20094ガラスの穴7":
            T_Name = Name;
            Text = "「それはシャバの常識ですよ、先輩。」";
            Before = "調べる20094ガラスの穴6";
            After = Skip;
            Skip = 0;
            Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
  case "調べる20094椅子":
    R_S(Number,"調べる");
    T_Name = Name;
    Text = "「そういえば、この椅子って座り心地よさそうだよな。」";
    After = "調べる20094椅子2";
    Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
    Scene_type = "メイン";
    break;
    case "調べる20094椅子2":
      T_Name = "まどか";
      Text = "「長時間座ることが多いからでしょうか。(改行) かなりいいですよ。」";
      Rewind = 0;
      Before = "調べる20094椅子";
      After = "調べる20094椅子3";
      Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case "調べる20094椅子3":
        T_Name = Name;
        Text = "「やっぱり そうなんだ。(改行) 一度座ってみたいなぁ」";
        Before = "調べる20094椅子2";
        After = "調べる20094椅子4";
        Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
        break;
        case "調べる20094椅子4":
          T_Name = "まどか";
          Text = "「あかり先輩のライブに銃を持って乱入とかしたら(改行) すぐに座れると思いますよ。」";
          Before = "調べる20094椅子3";
          After = "調べる20094椅子5";
          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
        case "調べる20094椅子5":
          T_Name = Name;
          Text = "「…それだと、(改行) 刑務所の住み心地も知る羽目になるからやだよ。」";
          Before = "調べる20094椅子4";
          After = "調べる20094椅子6";
          Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
          Scene_type = "メイン";
          break;
          case "調べる20094椅子6":
            T_Name = "まどか";
            Text = "「…そうですねぇ。私もそれは知りたくないです。」";
            Before = "調べる20094椅子5";
            After = "調べる20094椅子7";
            Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
            Scene_type = "メイン";
            break;
            case "調べる20094椅子7":
              Get_I_C_F("アイテム","事件概要","被害者は清水 久太郎 しみず きゅうたろう(改行)27歳 会社員(改行)死因はアレルギー性ショック症状による心停止(改行)蕎麦アレルギー持ち",2,"詳細",0);
              T_Name = "まどか";
              Text = "「ちゃんと私を出してくださいね！弁護士さん。」";
              Before = "調べる20094椅子6";
              After = Skip;
              Skip = 0;
              Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
              Scene_type = "メイン";
              break;
    case "つきつけ失敗":
      T_Name = Name;
      Text = "「今の証言はこの証拠品と明らかに矛盾しています！」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗2",0];
      Scene_type = "メイン";
      break;
    case "つきつけ失敗2":
      T_Name = "裁判長";
      Text = "「どこがですかな？」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗3",0];
      Scene_type = "メイン";
      break;
    case "つきつけ失敗3":
      T_Name = Name;
      Text = "「えっと…それは…」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗4",0];
      Scene_type = "メイン";
      break;
    case "つきつけ失敗4":
      T_Name = Name;
      Text = "「…」";
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗5",0];
      Scene_type = "メイン";
      break;
    case "つきつけ失敗5":
      T_Name = "裁判長";
      Text = "「弁護人はもっと考えて発言するように。」";
      Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗6",0];
      Scene_type = "メイン";
      break;
    case "つきつけ失敗6":
      T_Name = Name;
      Flag[6]--;
      Text = "(失敗したみたいだ…。)(改行)(改行)(残り"+Flag[6]+"回)";
      if(Flag[6]==0) After = "つきつけ失敗7";
      else After = Flag[4];
      Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,After,0];
      Scene_type = "メイン";
      break;
      case "つきつけ失敗7":
        T_Name = "裁判長";
        Text = "「そこまで！」";
        Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗8",0];
        Scene_type = "メイン";
        break;
      case "つきつけ失敗8":
        T_Name = "裁判長";
        Text = "「当法廷はこれ以上の裁判を認めません。」";
        Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗9",0];
        Scene_type = "メイン";
        break;
      case "つきつけ失敗9":
        T_Name = "裁判長";
        Text = "「被告人に判決を言い渡します。」";
        Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗10",0];
        Scene_type = "メイン";
        break;
        case "つきつけ失敗10":
          T_Name = "裁判長";
          Text = "「被告人に判決を言い渡します。」";
          Datas = ["裁判長",0,14,30,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗11",0];
          Scene_type = "メイン";
          break;
          case "つきつけ失敗11":
            T_Name = "裁判長";
            Text = "「被告人に判決を言い渡します。」";
            Datas = ["裁判長",0,14,0,0,0,15,30,T_Name,Text,0,0,0,"つきつけ失敗12",0];
            Scene_type = "メイン";
            break;
            case "つきつけ失敗12":
              T_Name = "裁判長";
              Text = "「本日は、これにて閉廷！」";
              Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"ゲームオーバー",0];
              Scene_type = "メイン";
              break;
    case "調べる何もない":
      T_Name = "";
      Text = "特に気になるものはない。";
      Datas[1] = 0;
      Datas[2] = 0;
      Datas[3] = 0;
      Datas[4] = 0;
      Datas[5] = 0;
      Datas[6] = 0;
      Datas[7] = 0;
      Datas[8] = "";
      Datas[9] = Text;
      Datas[10] = 0;
      Datas[11] = 0;
      Datas[12] = Number;
      Datas[13] = "調べる";
      Datas[14] = 0;
      Scene_type = "メイン";
      break;
    case "調べる":
      Get_Datas();
      Scene_type = Number;
      break;
    default:
      console.log(Number);
      Datas = ["Black",0,0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,"ゲームオーバー",0];
      Scene_type = "メイン";
      break;
  }//ココを変えるScene
}

function Inspect_loads2(Number){
  switch (Number) {
    default:
    Flag[4] = Number;
    if(Number.length>5){
      if(Number.substring(0,6)=="アイテム使用"){
        Number = Number.substring(6).split(",");
        if(Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Flag[4] = Flag[4]*1;
        Number = Number[0];
      }
    }
    break;
  }
  var Inspect = ["背景ナンバー","(幅,高さ,x座標,y座標,シーンナンバー)"];
  switch (Number) {//ここを変える調べる
    case 20009:
      Inspect = [1,122,708,175,189,"調べる"+Number+"ゴミ箱"];
      break;
      case 20094:
        Inspect = [2,439,449,707,277,"調べる"+Number+"椅子",657,361,285,297,"調べる"+Number+"ガラスの穴"];
        break;
    default:
      Inspect = ["Black",0,0,1600,900];
      break;
  }//ココを変える調べる
  return(Inspect);
}

function Get_Datas(){
  Get = true;
  Scene_loads2(Flag[4],false,true);
  Get = false;
  return;
}
