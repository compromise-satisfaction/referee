
var Rewind = 0;
var Skip = 0;
var Before = 0;
var After = 0;
var Datas = [];
var Flag = ["俛人","若辻","男",1,1,21,10,0,true,false];//3早戻し,4本線,5先送り,6体力,7アイテムページ,8オートセーブ,9選択音
var Item_Flag = [];//所持アイテム
var Pages = 0;//アイテムのページ
T_Name = "";
Text = "";
var Scene_type = "メイン";

function Save(Number){
  window.localStorage.setItem("Flag",Flag);
  window.localStorage.setItem("Number",Number);
  var Item_Flag2 = [];
  for (var i = 0; i < Item_Flag.length; i++) {
    Item_Flag2[i] = Item_Flag[i] + "端";
  }
  if(Item_Flag2==[]) Item_Flag2 = [[]+"端"]
  window.localStorage.setItem("Item",Item_Flag2);
}//save

function rand(n) {
  return Math.floor(Math.random() * (n + 1));
}

function R_S(a,b){
  Flag[3] = a;
  Flag[5] = b;
  Rewind = 0;
  Skip = b;
  Before = 0;
  return;
}

function Get_Item(a,b,c,d,e){
  Item_Flag[Item_Flag.length] = [a,b,c,d,e];
  return;
}//アイテムget

function Rewrite_Item(a,b,c,d,e){
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
  else Item_Flag[i] = [b,c,d,e];
  return;
}//アイテム情報の書き換え&Lost

function Scene_loads2(Number,Item){
  var Name = Flag[0];
  var Gender = Flag[2];
  var Surname = Flag[1];
  if(Gender=="男"){
    var www = ["僕","俺","吾輩","拙者"];
    var Person = www[rand(3)];
    var S_image = 1;
  }
  else{
    var Person = "私";
    var S_image = 2;
  }
  if(Item){
    switch (Item) {
      default:
        if(Item.substring(Item.length-5)=="つきつける"){
          var Text = "反応がない。";
          Datas = ["Transparent",0,0,0,0,0,0,0,"",Text,0,0,0,"シーンを外す",0];
          Scene_type = "メインpush";
          break;
        }
        else{
          var Text = "ここでは使えないようだ。";
          Datas = ["Transparent",0,0,0,0,0,0,0,"",Text,0,0,0,"シーンを外す",0];
          Scene_type = "メインpush";
        }
        break;
    }
    return;
  }
  Rewind = Flag[3];
  Skip = Flag[5];
  Before = Number-1;
  After = Number+1;
  if(Rewind==Before) Rewind = 0;
  if(Skip==After) Skip = 0;
  switch (Number) {
    case "タイトルに戻る":
      Scene_type = Number;
      break;
    case "ゲームオーバー":
      Datas = ["Black",0,0,0,"タイトルに戻る","セーブ読み込み",0,0,"タイトルに戻る","セーブ読み込み",0,0,0,0,Number];
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
        window.localStorage.setItem("syoken",false);
        var C1 = "第一話(未完成)";
        var C2 = "第二話(未完成)";
        var C3 = 0;
        var C4 = 0;
        var S1 = 1.1;
        var S2 = 0;
        var S3 = 0;
        var S4 = 0;
        Datas = ["Black",0,0,0,C1,C2,C3,C4,S1,S2,S3,S4,0,0,Number];
        Scene_type = "チョイス";
        break;
    case 1.1:
      R_S(Number,31);
      if(Flag[11]);
      else Item_Flag = [["弁護士バッジ",Person+"の身分を(改行)証明してくれる、(改行)大切なバッジだ。",1]]; //ここに来たことがなければ
      Flag[11] = true;//ここに来た
      T_Name = "";
      Text = Person+"の名前は"+ Surname + " " + Name +"。(改行)最近弁護士になったばかりの新入りだ。";
      After = 2;
      Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
      Scene_type = "メイン";
      break;
      case 2:
        Before = 1.1;
        Rewind = 0;
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
          var C1 = "資料を洗い直す";
          var C2 = "容疑者に会いに行く";
          var C3 = "先輩のお見舞いに行く";
          var C4 = "尋問テスト";
          var S1 = 32;
          var S2 = 33;
          var S3 = 34;
          var S4 = 35;
          if(Flag[10]){//事件概要を所持しているかどうか
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
        Flag[10] = true;//事件概要を所持した
        Get_Item("事件概要","被害者は清水 久太郎 しみず きゅうたろう(改行)27歳 会社員(改行)死因はアレルギー性ショック症状による心停止(改行)蕎麦アレルギー持ち",2,"詳細",0);
        Scene_type = [2,"事件概要を法廷記録にファイルした。",31];
        break;
        case 33:
          T_Name = "";
          if(Flag[10]){//事件概要を所持しているかどうか
            R_S(Number,1000);
            Text = "容疑者に合うに行こう。";
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
        T_name = "";
        Text = "尋問のテストを開始する！";
        Datas = ["Black",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
        Scene_type = "メイン";
       break;
       case 36:
       T_name = "裁判長";
       Text = "「これより、テスト裁判を開始します。」";
       Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
       Scene_type = "メイン";
       break;
       case 37:
       T_name = Name;
       Text = "「弁護側、準備完了しております。」";
       Datas = ["left",0,S_image,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
       Scene_type = "メイン";
      break;
      case 38:
      T_name = "？？？";
      Text = "「検察側、準備完了していません。」";
      Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
     T_name = "？？？";
     Text = "「仕方ないでしょう。(改行) ストーリーの進行が遅いのだから。」";
     Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
   case 42:
     T_Name = Name;
     Text = "「はぁ…。」";
     Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
     case 43:
     T_name = "裁判長";
     Text = "「仕方ありませぬな。」";
     Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
     case 44:
     T_name = "裁判長";
     Text = "「仕方ありませぬな。(改行) 検察側は適当に過ごしておくように。」";
     Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
     case 45:
       T_Name = Name;
       Text = "「…。」(改行)(いいのか？そんなので。)";
       Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
       Scene_type = "メイン";
       break;
     case 46:
     T_name = "？？？";
     Text = "「いいのよ。」";
     Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
     case 47:
     T_name = "？？？";
     Text = "「いいのよ。(改行) 本編逆転裁判だって実質証人との対決だしね。」";
     Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
     case 48:
       T_Name = Name;
       Text = "「そうですかね…。」";
       Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
       Scene_type = "メイン";
       break;
     case 49:
     T_name = "裁判長";
     Text = "「では、検事殿。最初で最後の証人の召喚を。」";
     Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
     Datas = ["stand",0,0,0,6,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
     Scene_type = "メイン";
     break;
   case 52:
   T_name = "？？？";
   Text = "「では、証人。名前と職業を。」";
   Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
   Scene_type = "メイン";
   break;
 case 53:
   T_Name = "？？？";
   Text = "「黙秘します。」";
   Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
   Scene_type = "メイン";
   break;
   case 54:
   T_name = "？？？";
   Text = "「は。」";
   Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
         T_name = "？？？";
         Text = "「関係ないでしょうそんなこと…。」";
         Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
         Scene_type = "メイン";
         break;
         case 59:
         T_name = "裁判長";
         Text = "「はて、蘇る逆転は2,3の後でしたかな？」";
         Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
             T_name = "？？？";
             Text = "「ふーん。」";
             Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
             Scene_type = "メイン";
             break;
             case 63:
             T_name = "？？？";
             Text = "「ふーん。(改行) とりあえず尋問しましょうか。」";
             Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
             Scene_type = "メイン";
             break;
             case 64:
               T_Name = Name;
               Text = "「こんな小さい子に尋問するんですか？」";
               Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
               Scene_type = "メイン";
               break;
               case 65:
               T_name = "？？？";
               Text = "「画像の数が乏しいのよ。仕方ないでしょう？」";
               Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
                     T_name = "？？？";
                     Text = "「そんなの作者の趣味でしょう？」";
                     Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,69,Number,After,Skip];
                     Scene_type = "メイン";
                     break;
                     case 72:
                     T_name = "？？？";
                     Text = "「そんなの作者の趣味でしょう？(改行) 事件には関係ないわ！」";
                     Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
                         T_name = "？？？";
                         Text = "「面倒だからね。」";
                         Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
                         Scene_type = "メイン";
                         break;
                         case 76:
                         T_name = "？？？";
                         Text = "「面倒だからね。サーバルちゃんの(改行) \"すっごーい\"なら用意してもいいわよ。」";
                         Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
                         Scene_type = "メイン";
                         break;
                         case 77:
                           T_Name = "サーバル";
                           Text = "「すっごーい！」";
                           Datas = ["stand",0,0,0,8,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                           Scene_type = "すっごーい！";
                           break;
                           case 78:
                           T_name = "？？？";
                           Text = "「今ので無駄に5行費やしたわ。」";
                           Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
                           Scene_type = "メイン";
                           break;
                           case 79:
                             T_Name = Name;
                             Text = "「…後で削除しといてください。」";
                             Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                             Scene_type = "メイン";
                             break;
                             case 80:
                             T_name = "？？？";
                             Text = "「はいよ～。」";
                             Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
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
                                         if(Flag[10]) After = 84;//事件概要所持してたら
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
                                           T_name = "裁判長";
                                           Text = "「被告人は無罪ということですな！」";
                                           Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
                                           Scene_type = "メイン";
                                           break;
                                           case 91:
                                           T_Name = Name;
                                           Text = "「え。」";
                                           Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
                                           Scene_type = "メイン";
                                           break;
                                           case 92:
                                           T_name = "？？？";
                                           Text = "「いいんじゃない？」";
                                           Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
                                           Scene_type = "メイン";
                                          break;
                                          case 93:
                                          T_name = "？？？";
                                          Text = "「いいんじゃない？これはテストなんだし。」";
                                          Datas = ["right",0,0,0,0,0,5,0,T_name,Text,Rewind,Before,Number,After,Skip];
                                          Scene_type = "メイン";
                                         break;
                                         case 94:
                                         T_name = "裁判長";
                                         Text = "「被告人は無罪！」";
                                         Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,Skip];
                                         Scene_type = "メイン";
                                         break;
                                         case 95:
                                         T_name = "ゲームクリア！";
                                         Text = "(完成まで待ってね)";
                                         After = "ゲームオーバー";
                                         Datas = ["裁判長",0,0,0,0,0,0,0,T_name,Text,Rewind,Before,Number,After,0];
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
                                                  Text = "「被告人は有罪！」";
                                                   Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"ゲームオーバー",0];
                                                   Scene_type = "メイン";
                                                   break;
    default:
      Datas = ["Black",0,0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,"ゲームオーバー",0];
      Scene_type = "メイン";
      break;
  }
}
