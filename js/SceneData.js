
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
var Moves = 0;

function have(Item){
for (var i = 0; i < Item_Flag.length; i++) {
if(Item_Flag[i][0]==Item) return(true);
}
for (var i = 10; i < Flag.length; i++) {
if(Flag[i]==Item) return(true);
}
return(false);
}

function Move(Number,fade){
  Moves = Number;
  Scene_type = "移動";
  if(fade) Scene_type = "フェードイン";
}

function Last(){
  After = Skip;
  Skip = 0;
}

function B_A(b,a){
  Before = b;
  After = a;
}

function Flag_reset(){
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

function Get_ICF(Get_Type,a,b,c,d,e){
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
Datas = [Datas[0],0,Datas[2],0,Datas[4],0,Datas[6],0,"",Text,0,0,0,Flag[4],0];
}
if(Scene_type == "チョイス"){
Datas = [Datas[0],0,Datas[1],0,Datas[2],0,Datas[3],0,"",Text,0,0,0,Flag[4],0];
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
case 20142:
Number = Item+Number;
Scene_loads2(Number,false,false);
Scene_type = "アイテム";
break;
default:
Default(Item);
break;
}
break;
case "つきつける弁護士バッジ":
switch (Number) {
case 20142:
case 20094:
case 20009:
Number = Item+Number;
Scene_loads2(Number,false,false);
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
Datas = ["stand",0,0,0,0,0,Number,"タイトルに戻る","タイトルに戻る","セーブ読み込み","セーブ読み込み"];
if(Flag[8]) Datas[9] = 0;
Scene_type = "チョイス";
break;
case -1:
Text = "自力でやれ。";
Datas = ["Black",0,0,0,0,0,0,0,"",Text,0,0,0,"ゲームオーバー",0,false,false,"テストロフィー",rand(11)+1];
Scene_type = "メイン";
break;
case 1:
Data = true;
Item_Flag = [];
Character_Flag = [];
var C1 = "第一話(未完成)";
var C2 = "第二話(未完成)";
var S1 = 1.1;
var S2 = 20001;
Rewind = 0;
Number = 0;
Flag_reset();
Datas = ["Black",0,0,0,Rewind,Before,Number,C1,S1,C2,S2];
Scene_type = "チョイス";
break;
case 1.1:
R_S(Number,31);
Get_ICF("アイテム","弁護士バッジ",Person+"の身分を↓証明してくれる、↓大切なバッジだ。",1);
Rewind = 0;
T_Name = "";
Text = Person+"の名前は"+ Surname + " " + Name +"。↓最近弁護士になったばかりの新入りだ。";
After = 2;
Datas = ["Black",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 2:
Before = 1.1;
Rewind = 0;
T_Name = "";
Text = "まだ先輩についての見習いに過ぎないがいずれは↓自分自身で法廷に立つことを目標にして↓聖ヶ丘法律事務所にお世話になって↓色々な慣例等を学びつつ日々の雑務をこなしている。";
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
Text = "机に座り書類を処理しながら反応するのは男性にしては↓長めの髪型をした壮年の男性ー↓"+Person+"がお世話になっているこの法律事務所の所長、↓聖ヶ丘 剣哉 だ";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 7:
T_Name = Name;
Text = "「所長、"+Person+"に用件があるとお聞きしたのですが↓一体何の御用でしょう？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 8:
T_Name = "";
Text = "所長のデスクに近づき質問をぶつけると↓所長は書類から顔をあげ腕を口の前で構え↓眼光鋭く真剣な顔で答え始める。";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 9:
T_Name = "聖ヶ丘";
Text = "「うむ、その前に↓埼律君の担当していた事件は知っているかね？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 10:
T_Name = Name;
Text = "「はい、"+Person+"も先輩の手伝いで↓資料を纏めていたので知ってはいますが」";
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
Text = "ベテランの先輩の仕事をわざわざ新米の自分が↓横からかっさらうような事をなぜ任されるのか。";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 17:
T_Name = Name;
Text = "「御言葉ですが……↓その、先輩はどうなさったのですか？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 18:
T_Name = "聖ヶ丘";
Text = "「驚くのも無理はないが、↓彼女は先日入院してしまってね」";
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
Text = "あの健啖家で剛健な埼律先輩が↓入院するなんてよっぽどの事故か病気か。";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 21:
T_Name = "聖ヶ丘";
Text = "「ああ、そんなに心配する事はないよ。↓ただの食べ過ぎによる急性胃腸炎だそうだ」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 22:
T_Name = "";
Text = "そう言って所長は全く困ったものだと↓額に手をあてため息をつく。";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 23:
T_Name = Name;
Text = "(ああ、なるほどそう言えば週末↓わんこそばに挑戦するとかいってたけど↓そんなになるまで食べるとは……)";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 24:
T_Name = "聖ヶ丘";
Text = "「他のメンバーも全員出払っていて↓手の空いているのが君しかいないのだよ。↓君はこの事件のあらましも知っていることだし↓引き受けてくれないか？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 25:
T_Name = Name;
Text = "「確かに少しは知っておりますが、↓その、宜しいのですか？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 26:
T_Name = "";
Text = "夢にまでみた法廷デビューが↓こんな形で転がって来たものの↓不安を隠せず問い返してしまう。";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 27:
T_Name = "聖ヶ丘";
Text = "「気にすることはないよ。↓君は優秀だと聞いているし私の聞いたところこの事件、↓勝そうだ。それに後のことは此方で↓キッチリフォローするから思うようにやってみたまえ」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 28:
T_Name = Name;
Text = "「わ、判りました。↓それでは準備に取りかかりますので失礼いたします」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 29:
T_Name = "";
Text = "所長の剣幕に押され↓了承してしまった"+Person+"は一礼し所長室を後にする。";
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
Datas = ["Black",0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
if(have("事件概要")){//事件概要を所持しているかどうか
C1 = "容疑者に会いに行く";
C2 = "先輩のお見舞いに行く";
C3 = "尋問テスト";
S1 = 33;
S2 = 34;
S3 = 35;
Datas = ["Black",0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3];
}
Scene_type = "チョイス";
break;
case 32:
Get_ICF("アイテム","事件概要","被害者は清水 久太郎 しみず きゅうたろう↓27歳 会社員↓死因はアレルギー性ショック症状による心停止↓蕎麦アレルギー持ち",2,"詳細",0);
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
Get_ICF("人物","未知の決闘者","遊☆戯☆王 THE DARK SIDE OF DIMENSIONSの↓前日談に海馬と戦った決闘者。↓前日談はもう読めないので知名度が低そう。↓スタイルがいいがこれはアバターである。",10);
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
Text = "「仕方ないでしょう。↓ストーリーの進行が遅いのだから。」";
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
Text = "「仕方ありませぬな。↓検察側は適当に過ごしておくように。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 45:
T_Name = Name;
Text = "「…。」↓(いいのか？そんなので。)";
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
Text = "「いいのよ。↓本編逆転裁判だって実質証人との対決だしね。」";
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
Get_ICF("人物","セラ","ホント可愛い藍神ィ…の妹。↓未知の決闘者の中身。↓遊戯王デュエルリンクスでプレイできるぞ。↓さあ、今すぐインストール！",11);
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
Text = "「あなただって、名前欄【？？？】じゃないですか。↓それに、逆転裁判1でのみ御剣検事は↓証人に名前を聞くのが苦手って設定があるんですよ。」";
Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 57:
T_Name = "？？？";
Text = "「そんな感じがしない2,3が発売された後の↓蘇る逆転でも何故かあるっぽい謎の設定です。」";
Datas = ["stand",0,0,0,6,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 58:
T_Name = "？？？";
Text = "「関係ないでしょうそんなこと…。↓まあ人物欄はあるしいいか。」";
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
Text = "「たぶんそうよ。自信はないけどね。↓根拠としては3に出てくる店のチラシがでてくるわ。」";
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
Text = "「ふーん。↓とりあえず尋問しましょうか。」";
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
Text = "「今あなたウインクしたじゃないですか！↓そんな画像が用意できるなら…。」";
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
Text = "「そんなの作者の趣味でしょう？↓事件には関係ないわ！」";
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
Text = "「面倒だからね。サーバルちゃんの↓\"すっごーい\"なら用意してもいいわよ。」";
Datas = ["right",0,0,0,0,0,5,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 77:
T_Name = "サーバル";
Get_ICF("人物","サーバル","ジャンプ力ぅ…ですかねぇ…↓高いところに、スッと、↓ジャンプできる動物でして、↓結構高いところが好きなので。",9);
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
Get_ICF("人物","未知の決闘者","遊☆戯☆王 THE DARK SIDE OF DIMENSIONSの↓前日談に海馬と戦った決闘者。↓前日談はもう読めないので知名度が低そう。↓スタイルがいいがこれはアバターである。",10);
Get_ICF("人物","セラ","ホント可愛い藍神ィ…の妹。↓未知の決闘者の中身。↓遊戯王デュエルリンクスでプレイできるぞ。↓さあ、今すぐインストール！",11);
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
var S1 = 84;
var S2 = 31;
Before = 83.4;
Datas = ["left",S_image,0,0,Rewind,Before,Number,C1,S1,C2,S2];
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
Get_ICF("アイテム","弁護士バッジ",Person+"の身分を↓証明してくれる、↓大切なバッジだ。",1);
T_Name = "1月4日 9時36分";
Text = "聖ヶ丘法律事務所";
Datas = [1,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20002:
T_Name = "埼律 美智子";
Text = "「いやー、→→→おせちにお雑煮、→→→↓お正月は美味しいものが↓たくさんあってまいるねぇ」";
Datas = [1,0,S_image,15,0,0,10,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20003:
T_Name = Name;
Text = "「先輩…→→→→→→食べ過ぎて↓鏡餅みたいになるくらいなら↓結構ですけど、→→→前みたいなことは↓ゴメンですよ？」";
Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20004:
T_Name = Name;
Text = "「初めての裁判が殺人事件で↓こっちは大変だったんですから。」";
Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20005:
T_Name = "美智子";
Text = "「まあまあ。→→→→→→↓でも、→→→初めてであんな裁判を↓やってのけたんだからこれから依頼が↓わんさかくるんじゃない？」";
Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20006:
T_Name = Name;
Text = "「まさか。→→→→→→そんな単純に↓行くわけないじゃないですか。」";
Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20007:
T_Name = "聖ヶ丘";
Text = "「いや。→→→→→→それがそうでもないぞ。」";
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
var C1 = "話す";
var C2 = "調べる";
var C3 = "移動する";
var C4 = "つきつける";
var S1 = 20010;
var S2 = 0;
var S3 = 20022;
var S4 = 0;
R_S(20001,Number);
Rewind = 20001;
Before = 20008;
Datas = [1,S_image,0,4,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case "調べる20009ゴミ箱":
R_S(Number,"調べる");
T_Name = Name;
Text = "「先輩の食べたおやつのゴミで↓散らかっている。」";
After = "調べる20009ゴミ箱2";
Datas = [1,0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20009ゴミ箱2":
T_Name = "美智子";
Text = "「ちょっと！↓私だけのせいにしないでよ！」";
Rewind = 0;
Before = "調べる20009ゴミ箱";
After = "調べる20009ゴミ箱3";
Datas = [1,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20009ゴミ箱3":
T_Name = "聖ヶ丘";
Text = "「そういえば、↓私はそのゴミ箱を使っていないな。」";
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
Text = "「お？つきつけるかい？↓あの噂は本当だったんだな。」";
After = "つきつける弁護士バッジ20009_2";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
if(Scene_type != "アイテム") Scene_type = "メイン";
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
var C3 = "人の身の上や物事についての確実でない話。";
var S1 = "つきつける弁護士バッジ20009_4";
var S2 = "つきつける弁護士バッジ20009_5";
var S3 = "つきつける弁護士バッジ20009_6";
Datas = [1,10,0,S_image,Rewind,Before,Number,C1,S1,C2,S2,C3,S3];
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
Text = "「弁護士バッジをつきつけたがる↓弁護士は優秀っていう噂だよ。」";
After = "つきつける弁護士バッジ20009_5.1";
Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20009_5.1":
T_Name = "美智子";
Text = "「へー。↓じゃあ私もやってみようかな。」";
Rewind = 0;
Before = "つきつける弁護士バッジ20009_5";
After = "つきつける弁護士バッジ20009_5.2";
Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20009_5.2":
T_Name = Name;
Text = "(その前に先輩は弁護士バッジを↓ もっと磨いた方がいいと思うが…)";
Before = "つきつける弁護士バッジ20009_5.1";
After = 20009;
Skip = 0;
Datas = [1,0,10,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20009_6":
R_S(Number,20009);
T_Name = Name;
Text = "「ある人の身の上や、↓物事についての↓確実でない話のことですよ。」";
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
Text = "「弁護士バッジをつきつけたがる↓弁護士は優秀っていう噂だったんだが↓…やっぱり嘘かもしれないな。」";
Before = "つきつける弁護士バッジ20009_6.1";
After = 20009;
Skip = 0;
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20010:
var C1 = "依頼について";
var S1 = 20011;
var S2 = 20016;
if(have("依頼について")){
C1 += " ✓";
C2 = "依頼人について";
}
if(have("依頼人について")) C2 += " ✓";
Rewind = 0;
Before = 20009;
Datas = [1,S_image,0,4,Rewind,Before,Number,C1,S1,C2,S2];
Scene_type = "チョイス";
break;
case 20011:
R_S(Number,20010);
Get_ICF("フラグ","依頼について");
T_Name = Name;
Text = "「所長、→→→そうでもないとはどういうことですか？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20012:
T_Name = "聖ヶ丘";
Text = "「ああ、→→→実はな"+Surname+"君。→→→→→→↓君に弁護の依頼が来ているのだ。」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20013:
T_Name = Name;
Text = "「えっ。→→→→→→本当ですか？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20014:
T_Name = "美智子";
Text = "「ホラホラ。→→→→→→私の言った通りじゃん。」";
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
Get_ICF("フラグ","依頼人について");
T_Name = "聖ヶ丘";
Text = "「依頼人は瀬名 翼というらしい。→→→→→→↓君の友人だそうだね？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20017:
T_Name = Name;
Text = "「なんですって！？→→→→→→瀬名の奴が！？」";
Datas = [1,0,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20018:
T_Name = "聖ヶ丘";
Text = "「留置所で待ってるそうだから、→→→↓詳しい話は本人に聞くといい。」";
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
Text = "「それと、→→→今回の事件は↓難しいだろうから↓埼律君もサポートを頼むよ。」";
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
var S1 = C1+"へ移動";
if(have("依頼人について")==false) S1 = 20023;
if(have("留置所")){
  var C2 = "スターライト学園正門";
  var S2 = C2+"へ移動";
}
Rewind = 0;
Before = 20009;
Datas = [1,S_image,0,4,Rewind,Before,Number,C1,S1,C2,S2];
Scene_type = "チョイス";
break;
case 20023:
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
R_S(Number,20094);
T_Name = "同日 某時刻";
Text = "留置所";
After = 20024.1;
Datas = ["留置所",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20024.1:
T_Name = "美智子";
Text = "「おや？→→→面会に沢山の↓女の子が来てるみたいだね。」";
Before = 20024;
After = 20025;
Rewind = 0;
Datas = ["留置所",0,10,15,0,0,S_image,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20025:
T_Name = Name;
Text = "「それに、→→→何故かテレビカメラが↓何台かいますね。」";
Before = 20024.1;
Rewind = 20024;
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20026:
T_Name = "美智子";
Text = "「まあ、→→→そんなことより瀬名さんって↓どんな人なのさ？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20027:
T_Name = Name;
Text = "「中学の時の知り合いなんですが、→→→↓その頃からドレスの作成に興味があって↓今では自分のブランドを持ってたと思いますよ。」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20028:
T_Name = "美智子";
Text = "「そうなんだ、→→→すごいじゃん！↓ちなみに、→→→なんてブランドなの？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20029:
T_Name = Name;
Text = "「たしか…→→→→→→↓“Dreamy Crown”↓だったかな？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20030:
T_Name = "美智子";
Text = "「え！？→→→ドリーミークラウン！？→→→↓それってあかりちゃんのドレスのブランドだよね！？→→→↓"+Surname+"君そんなすごい人と友達だったの？」";
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
Text = "「何言ってんのさ。→→→→→→↓大空あかりちゃんと言えば↓スターライトクイーンだよ？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20033:
T_Name = "美智子";
Text = "「君だって、→→→→→→”大空お天気”→→→→→→↓くらいはみたことがあるんじゃない？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20034:
T_Name = Name;
Text = "「ああ。→→→→→→あの子ですか。」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20035:
T_Name = "美智子";
Text = "「これは是が非でも無罪にして、→→→↓お礼にドレスを作ってもらわないとね。」";
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
Text = "「ところで、→→→ドリーミークラウンのデザイナーさんは↓人里離れた湖畔でデザインをしてるって↓テレビであかりちゃんが言ってたけど？」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20038:
T_Name = Name;
Text = "「そうなんですよ。→→→→→→↓そんなに人付き合いをする奴でもなかったし、↓一体何の罪で…。」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20039:
T_Name = "？？？";
Text = "「おい。→→→→→→別に俺は捕まってないぞ。」";
Datas = ["留置所",0,S_image,0,0,0,18,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20040:
T_Name = Name;
Get_ICF("人物","瀬名 翼","Dreamy Crown のデザイナー。↓瀬名翼の画像をアップすると↓近い構図の春日が送られてくる↓Twitterが存在して笑った。",12);
Text = "「あっ、→→→瀬名。↓なんだ、→→→てっきりお前が捕まったのかと思ったぞ。」";
Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20041:
T_Name = "瀬名 翼";
Text = "「ああ。→→→→→→今回捕まったのは知り合いのアイドルだ。」";
Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20042:
T_Name = "美智子";
Text = "「それはよかった。→→→→→→知り合いを弁護とか気が重いし↓"+Surname+"君がもし弁護に失敗しても↓ドリーミークラウンはなくならいないわけね。」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20043:
T_Name = Name;
Text = "「それ、→→→絶対依頼人に言わないでくださいよ…。」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20044:
T_Name = "瀬名";
Text = "「まあ、→→→アイツならそんなこと気にしないだろうがな。」";
Datas = ["留置所",0,S_image,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20045:
T_Name = "美智子";
Text = "「じゃあ、→→→まずは被告人に面会したいところだけど…→→→→→→↓人が多いわね。」";
Datas = ["留置所",0,10,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20046:
T_Name = "瀬名";
Text = "「今、→→→面会中の奴等は知り合いなんで、→→→↓ちょっと声かけてきますよ。」";
Datas = ["留置所",0,10,0,0,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20047:
T_Name = "瀬名";
Text = "「おい、→→→大空。」";
Datas = ["留置所",0,18,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20048:
T_Name = "？？？";
Text = "「あっ →→→→→→瀬名さん！」";
Datas = ["留置所",0,18,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20049:
T_Name = "？？？";
Text = "「瀬名さんも、→→→まどかちゃんの面会に来たんですか？」";
Datas = ["留置所",0,18,0,0,0,20,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20050:
T_Name = "瀬名";
Text = "「いや、→→→俺じゃなくて 知り合いの弁護士だ。」";
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
Text = "「弁護士の"+Surname+" "+Name+"です。」";
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
Get_ICF("人物","氷上 スミレ","スターライト学園のアイドル。↓通称ステージに咲く氷の花。",6);
Text = "「氷上 スミレです。」";
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
Text = "「スミレちゃん、→→→前にタルト・タタンのステージで↓りんごを使うことになって、→→→↓慣れるためにいつも持ち歩いてたら↓癖になっちゃったんです。」";
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
After ++;
Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
Scene_type = "メイン";
break;
case 20062:
T_Name = "スミレ";
Text = "「こっちも何か見せないとダメかな、→→→と思ったので…。→→→→→→→→→→→→→→→↓良かったらどうぞ。」";
Before --;
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
Text = "「まあ、→→→せっかくだし貰っておくよ。」";
Datas = ["留置所",0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",3];
Scene_type = "メイン";
break;
case 20065:
Get_ICF("アイテム","りんご","氷上 スミレから貰った。↓いつも持ち歩いているらしい。",3);
Scene_type = [3,"りんごを受け取った。",20066];
break;
case 20066:
T_Name = "美智子";
Text = "「…→→→→→→→→→→→→本物のルミナスだ。」";
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
Text = "「ルミナスよ！→→→→→→ルミナス！」";
Datas = ["留置所",0,10,0,0,0,S_image,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20069:
T_Name = "美智子";
Text = "「ステージに咲く氷の花、→→→氷上スミレちゃん！」";
Datas = ["留置所",0,10,0,0,0,20,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20070:
Get_ICF("人物","新条 ひなき","スターライト学園のアイドル。↓モデルとしても活躍している。",7);
T_Name = "美智子";
Text = "「モデルとしても活躍している新条ひなきちゃん！」";
Datas = ["留置所",0,10,0,0,0,21,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20071:
T_Name = "美智子";
Get_ICF("人物","大空 あかり","スターライト学園のアイドル。↓スターライトクイーン。",13);
Text = "「そして、スターライトクイーンの大空あかりちゃん！→→→→→→→→→さっき話したでしょ！」";
After ++;
Datas = ["留置所",0,10,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20073:
T_Name = "美智子";
Text = "「この三人が組んでいるユニット。→→→→→→↓それがルミナスなのよ！」";
Before --;
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
Text = "「まさかこんなところで会えるなんで…→→→→→→↓でもいったいどうして？」";
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
Text = "「え！？そういえばさっきまどかって…↓じゃあ今回の依頼人って天羽まどかちゃん？」";
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
Text = "「なるほど…被告人はアイドルか…。↓それであんなにテレビカメラがいるわけだ。」";
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
Text = "「早くまどかちゃんを出してあげないと。↓まどかちゃんが犯人のはずがない。↓ファンならみんなそういうわ。」";
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
Text = "「まどかちゃん天使系で売ってるけど↓実際小悪魔系だし。」";
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
Text = "「ちょっと！↓ひどいじゃないですか！」";
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
Get_ICF("人物","瀬名 翼","Dreamy Crown のデザイナー。↓瀬名翼の画像をアップすると↓近い構図の春日が送られてくる↓Twitterが存在して笑った。",12);
Get_ICF("人物","大空 あかり","スターライト学園のアイドル。↓スターライトクイーン。",13);
Get_ICF("人物","氷上 スミレ","スターライト学園のアイドル。↓通称ステージに咲く氷の花。",6);
Get_ICF("人物","新条 ひなき","スターライト学園のアイドル。↓モデルとしても活躍している。",7);
Get_ICF("アイテム","りんご","氷上 スミレから貰った。↓いつも持ち歩いているらしい。",3);
Get_ICF("人物","天羽 まどか","スターライト学園のアイドル。↓今回の事件の被告人。",8);
Get_ICF("フラグ","留置所");
var C1 = "話す";
var C2 = "調べる";
var C3 = "移動する";
var C4 = "つきつける";
var S1 = 20095;
var S3 = 20135;
R_S(20024,Number);
Rewind = 20024;
Before = 20093;
Datas = ["留置所",0,22,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20095:
var C = [];
C[0] = ["まどかのこと",20096];
C[1] = ["被害者のこと",20103];
C[2] = ["事件現場のこと",20119];
if(have(C1)) Get_ICF("人物","天羽 まどか","スターライト学園のアイドル。↓今回の事件の被告人。↓自称善良な一般アイドル。",8);
for (var i = 0; i < 3; i++) {
  if(have(C[i][0])) C[i][0] += " ✓"
}
Rewind = 0;
Before = 20094;
Datas = ["留置所",0,22,0,Rewind,Before,Number,C[0][0],C[0][1],C[1][0],C[1][1],C[2][0],C[2][1]];
Scene_type = "チョイス";
break;
case 20096:
R_S(Number,20095);
Get_ICF("フラグ","まどかのこと");
T_Name = Name;
Text = "「えっと…鹿目さん。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20097:
T_Name = "まどか";
Text = "「天羽です。というか、↓まどかちゃんでいいですよ。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20098:
T_Name = Name;
Text = "(サラッとちゃん付けを強要された)";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20099:
T_Name = Name;
Text = "「まどかちゃんは、↓どうして逮捕されたか心当たりある？」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20100:
T_Name = "まどか";
Text = "「ないですよ。↓私は善良な一般アイドルです。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20101:
T_Name = "まどか";
Text = "「でも、警察の人が言うには↓最後に被害者にあったのが私で↓他にも証拠があるとか。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20102:
T_Name = Name;
Text = "(最後にあった。↓→→→→→→→→→…ってことは容疑は殺人か。)";
After = Skip;
Skip = 0;
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20103:
R_S(Number,20095);
Get_ICF("フラグ","被害者のこと");
T_Name = Name;
Text = "「じゃあ、被害者について教えてもらおうかな。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20104:
T_Name = "まどか";
Text = "「はい。↓被害者は三ノ輪ヒカリ先輩です。↓…殺されちゃったみたいですね。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20105:
T_Name = Name;
Text = "「先輩、ってことは↓その子もアイドルだったんだ？」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20106:
T_Name = "美智子";
Text = "「なるほど。三ノ輪あかりちゃん。↓聞いたことないわね。」";
Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20107:
T_Name = "スミレ";
Text = "「三ノ輪”ヒカリ”です。↓間違えないでください。」";
Datas = ["留置所",0,10,0,22,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20108:
T_Name = "美智子";
Text = "「あっゴメン…。↓アイドルの名前間違えるのってかなり失礼だったわね。」";
Datas = ["留置所",0,10,0,22,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20109:
T_Name = "スミレ";
Text = "「そうですよ。気を付けてくださいね。」";
Datas = ["留置所",0,10,0,22,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20110:
T_Name = "まどか";
Text = "「まあ、三ノ輪先輩はネット配信が↓活動の中心なので、知らない人は知らないですから。」";
Datas = ["留置所",0,10,0,22,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20111:
T_Name = Name;
Text = "(先輩、ネットはあんまり見ないからな…)";
Datas = ["留置所",0,10,0,22,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20112:
T_Name = Name;
Text = "「それで、その先輩との関係は良好だったの？」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20113:
T_Name = "まどか";
Text = "「いえ、それが…警察の方は最後にあったのが私だって言ってるんですが、その日どころか一度もあったことがないんです。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20114:
T_Name = "美智子";
Text = "「えっ面識ないの？」";
Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20115:
T_Name = "まどか";
Text = "「学年が違いますし、そもそも三ノ輪先輩はネット配信の為に学園のステージ会場地下にあるスタジオに籠ってほとんど出てこない人だったらしいので。」";
Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20116:
T_Name = "あかり";
Text = "「そういえば、私達も会ったことがないね。」";
Datas = ["留置所",0,10,0,22,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20117:
T_Name = "ひなき";
Text = "「ですな～」";
Datas = ["留置所",0,10,0,22,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20118:
Get_ICF("人物","三ノ輪 ヒカリ","スターライト学園のアイドル。↓今回の事件の被害者。",14);
T_Name = Name;
Text = "(会うこと自体、難しかったわけか…)";
After = Skip;
Skip = 0;
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20119:
R_S(Number,20095);
Get_ICF("フラグ","事件現場のこと");
T_Name = Name;
Text = "「そういえば、事件現場ってどこ？」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20120:
T_Name = "まどか";
Text = "「被害者である先輩が、いつも籠ってた学園のステージ会場地下にあるスタジオだって聞いてます。」";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20121:
T_Name = "美智子";
Text = "「学園ってスターライト学園？」";
Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20122:
T_Name = "まどか";
Text = "「はい。」";
Datas = ["留置所",0,10,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20123:
T_Name = "美智子";
Text = "「"+Surname+"君！早速現場に向かいましょう！」";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20124:
T_Name = "まどか";
Text = "「現場百遍ってやつですね。頑張ってください！」";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20125:
T_Name = Name;
Text = "(この人の場合、アイドルの学園に興味があるだけだろうなぁ…)";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20126:
T_Name = "まどか";
Text = "「あっ、関係者以外の方が学園に入るのは難しいと思うので、とりあえず私の学生証持って行ってください！」";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20127:
T_Name = "美智子";
Text = "「キャー！↓スターライト学園の学生証だよ↓"+Surname+"君！」";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20128:
T_Name = Name;
Text = "「はいはい…」";
Datas = ["留置所",0,S_image,0,22,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20129:
Scene_type = [5,"学生証を先輩にむしり取られた。",20130];
break;
case 20130:
T_Name = "あかり";
Text = "「念のため、私たちが案内しますよ！」";
Before = 20128;
Datas = ["留置所",0,10,0,22,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20131:
T_Name = "美智子";
Text = "「ルミナスに案内されるなんて心強いです！」";
Datas = ["留置所",0,10,0,22,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20132:
T_Name = Name;
Text = "「じゃ、お願いしますね。」";
Datas = ["留置所",0,S_image,0,22,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20133:
T_Name = "瀬名";
Text = "「じゃあ、後のことは任せて、俺はこの辺で帰るな。」";
Datas = ["留置所",0,S_image,0,22,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20134:
T_Name = Name;
Text = "「おう、じゃあな」";
After = Skip;
Skip = 0;
Datas = ["留置所",0,S_image,0,22,0,18,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20135:
var C1 = "スターライト学園正門";
var C2 = "聖ヶ丘法律事務所";
var S1 = C1+"へ移動";
var S2 = C2+"へ移動";
Rewind = 0;
Before = 20094;
Datas = ["留置所",0,22,0,Rewind,Before,Number,C1,S1,C2,S2];
Scene_type = "チョイス";
break;
case "聖ヶ丘法律事務所へ移動":
Move(20009);
break;
case "スターライト学園正門へ移動":
Move(20136);
if(have("留置所での会話無し")) Move(20142);
if(have("事件現場のこと")) Move(20146);
if(have("事件現場へ")) Move(20155);
break;
case "地下スタジオへ移動":
Move(20157);
if(have("事件現場")) Move(20183);
break;
case "留置所へ移動":
Move(20024);
if(have("留置所")) Move(20094);
break;
case 20136:
R_S(Number,20142);
Get_ICF("フラグ","留置所での会話無し");
T_Name = "同日 某時刻";
Text = "スターライト学園正門";
Datas = [3,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20137:
T_Name = "？？？";
Text = "「Oh、なんだ君は？↓ここは立ち入り禁止だぜYeah!」";
Datas = [3,0,0,0,23,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20138:
T_Name = Name;
Text = "(なんかやたら濃い人が現れたぞ…)";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20139:
T_Name = Name;
Text = "「あの、"+Person+"達天羽まどかさんの↓弁護士でして…」";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20140:
T_Name = "？？？";
Text = "「天羽ハニーの弁護士？↓ならその証拠を持ってくるんだ！↓それが弁護士の仕事だぜYeah!」";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20141:
T_Name = Name;
Text = "(この人が一体弁護士の何を知っているというんだ…)";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20142:
var C1 = "話す";
var C2 = "調べる";
var C3 = "移動する";
var C4 = "つきつける";
var S1 = 20144;
var S2 = 0;
var S3 = 20143;
var S4 = 0;
R_S(20136,Number);
Rewind = 20136;
Before = 20141;
Datas = [3,0,23,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20143:
var C1 = "留置所";
var C2 = "聖ヶ丘法律事務所";
var S1 = C1+"へ移動";
var S2 = C2+"へ移動";
Rewind = 0;
Datas = [3,0,23,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20144:
R_S(Number,20142);
T_Name = "？？？";
Text = "「Galaxy！↓Amazing！↓It's Showtime!!」";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20145:
T_Name = Name;
Text = "(この人とは↓なるべく話したくないな…)";
After = Skip;
Skip = 0;
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20146:
Get_ICF("人物","三ノ輪 ヒカリ","スターライト学園のアイドル。↓今回の事件の被害者。",14);
R_S(Number,20155);
T_Name = "同日 某時刻";
Text = "スターライト学園正門";
Datas = [3,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20147:
T_Name = Name;
Text = "「誰かいるみたいだ。」";
if(have("留置所での会話無し")) Text = "「あの人、まだいるみたいだな。」";
Datas = [3,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20148:
T_Name = "？？？";
Text = "「なんだ、キミは？」";
if(have("留置所での会話無し")) Text = "「なんだ、またきたのか？」";
Datas = [3,0,0,0,23,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20149:
T_Name = "あかり";
Text = "「あっ ジョニー先生！↓この人、まとかちゃんの弁護士さんです」";
Datas = [3,0,23,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20150:
T_Name = "ジョニー";
Text = "「しかし、部外者を簡単に入れるわけには…」";
Datas = [3,0,23,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20151:
T_Name = "あかり";
Text = "「瀬名さんのお友達でもあるそうですよ」";
Datas = [3,0,23,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20152:
T_Name = "ジョニー";
Text = "「瀬名ウイングの？↓…ならノープロブレム！↓俺はちょっと用事があるから↓後のことは頼んだぜハニー達！」";
Datas = [3,0,23,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20153:
T_Name = Name;
Text = "「弁護士より瀬名の友人の方が立場が上なのか、ここは…。」";
Datas = [3,0,23,-15,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20154:
T_Name = "(先輩)";
Text = "「とりあえず、事件現場に行きましょうか。」";
Datas = [3,0,10,15,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20155:
Get_ICF("人物","ジョニー別府","スターライト学園の教師の一人。↓本名は不明。",15);
Get_ICF("フラグ","事件現場へ");
var C1 = "調べる";
var C2 = "移動する";
var S2 = 20156;
R_S(20146,Number);
Rewind = 20146;
Before = 20154;
Datas = [3,0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case "調べる20155":
R_S(Number,"調べる");
T_Name = "(先輩)";
Text = "「あっここ！↓”Du-Du-Wa DO IT!!”のPVで見たことある！」";
After = "調べる20155_2";
Datas = [3,0,10,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20155_2":
T_Name = "ひなき";
Text = "「あれは制服で踊る数少ないPVですな。」";
Rewind = 0;
Before = "調べる20155";
After = "調べる20155_3";
Datas = [3,0,10,0,0,0,21,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20155_3":
T_Name = "(先輩)";
Text = "「そうそう。それと、崖上りのシーンが印象的だよね。」";
Before = "調べる20155_2";
After = "調べる20155_4";
Datas = [3,0,10,0,0,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20155_4":
T_Name = Name;
Text = "(崖上り…？)";
After = Skip;
Skip = 0;
Datas = [3,0,10,0,0,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20156:
var C1 = "地下スタジオ";
var S1 = C1+"へ移動";
var C2 = "留置所";
var S2 = C2+"へ移動";
var C3 = "聖ヶ丘法律事務所";
var S3 = C3+"へ移動";
Rewind = 0;
Datas = [3,0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20157:
R_S(Number,20183);
T_Name = "同日 某時刻";
Text = "地下スタジオ前廊下";
Datas = [5,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20158:
T_Name = Name;
Text = "「随分と主張の激しい↓立ち入り禁止だな。」";
Datas = [5,0,S_image,15,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20159:
T_Name = "スミレ";
Text = "「霧矢先輩によると、↓三ノ輪先輩はライブを邪魔されたり、↓練習を見られたりするのが嫌いだったらしいです。」";
Datas = [5,0,S_image,0,0,0,20,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20160:
T_Name = Name;
Text = "「じゃ、今は別に入って問題ないってことだよな。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20161:
T_Name = "スタッフ";
Text = "「あ、構いませんよ。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20162:
T_Name = Name;
Text = "「あ、スタッフさんですか。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20163:
T_Name = "スタッフ";
Text = "「はい。ただ、ここは飲食物持ち込み禁止なので、そのりんごはちょっと。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20164:
T_Name = Name;
Text = "「そうなんですか。どうするかな」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20165:
T_Name = "スタッフ";
Text = "「よかったら、預かっておきますよ。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20166:
T_Name = Name;
Text = "「あ、じゃあお願いします。」";
Datas = [5,0,S_image,0,0,0,20,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20167:
if(have("りんご")) Get_ICF("アイテム","りんご","書き換え","引換券");
Get_ICF("アイテム","引換券","スタッフにりんごを↓預けたことを証明する券。↓地下ステージは飲食禁止らしい。",16);
Scene_type = [16,"りんごを渡して引換券を受け取った。",20168];
break;
case 20168:
T_Name = "(先輩)";
Text = "「じゃあ入りましょうか。」";
Before = 20166;
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20169:
T_Name = Name;
Text = "「でも、このドアカードキーを↓タッチして開けるタイプみたいですよ」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20170:
T_Name = "(先輩)";
Text = "「そこはコレでしょう。」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,15",5];
Scene_type = "メイン";
break;
case 20171:
T_Name = "";
Text = "ピッ";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0600,0250,0",5];
Scene_type = "メイン";
break;
case 20172:
T_Name = "";
Text = "ブブー";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20173:
T_Name = "(先輩)";
Text = "「あれ？おかしいな。」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20174:
T_Name = "スタッフ";
Text = "「ああ、そこは限られた↓生徒さんしか入れないんですよ。↓でも、今は調査のためにロックをかけてないので↓手動で開きますよ。」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20175:
T_Name = "(先輩)";
Text = "「なんだそうか…ちょっと楽しみだったのにな。残念。」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20176:
T_Name = Name;
Text = "「でも、これは有益な情報ですよ。」";
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20177:
Get_ICF("アイテム","地下ステージのドア","限られた生徒しか↓開けれないらしい。↓まどかの学生証は反応しなかった。",17);
Scene_type = [17,"地下ステージのドアを↓法廷記録にファイルした。",20177.1];
break;
case 20177.1:
T_Name = "(先輩)";
Text = "「じゃあこんどこそ入りましょうか。」";
Before = 20176;
After = 20177.2;
Datas = [5,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20177.2:
T_Name = "";
Text = "地下ステージ";
Before = 20177.1;
After = 20178;
Datas = [4,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20178:
T_Name = Name;
Text = "「随分質素なステージだな。」";
Before = 20177.2;
After = 20178.1;
Datas = [4,0,S_image,15,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20178.1:
T_Name = "ひなき";
Text = "「三ノ輪先輩は実力派だったから、↓ステージは関係ないんだぜ。」";
Before = 20178;
After = 20178.2;
Datas = [4,0,S_image,0,0,0,21,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20178.2:
T_Name = "スミレ";
Text = "「アイカツシステムで、↓見栄えは変わるしね。」";
Before = 20178.1;
After = 20179;
Datas = [4,0,20,15,0,0,21,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20179:
T_Name = "あかり";
Text = "「でも、バミったテープがそのままなのは変じゃないかな？」";
Datas = [4,0,20,0,0,0,19,15,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20180:
T_Name = "スミレ";
Text = "「あれはバミってるんじゃなくて↓遺体のあった場所のテープみたい。」";
Datas = [4,0,20,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20181:
T_Name = "(先輩)";
Text = "「つまり、イミってるってやつだね。」";
Datas = [4,0,10,15,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20182:
T_Name = Name;
Text = "(訳のわからない単語を増やさないでくれ…)";
Datas = [4,0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20183:
if(have("りんご")) Get_ICF("アイテム","りんご","書き換え","引換券");
Get_ICF("アイテム","引換券","スタッフにりんごを↓預けたことを証明する券。↓地下ステージは飲食禁止らしい。",16);
Get_ICF("アイテム","地下ステージのドア","限られた生徒しか↓開けれないらしい。↓まどかの学生証は反応しなかった。",17);
Get_ICF("フラグ","事件現場");
var C1 = "調べる";
var S1 = 0;
var C2 = "移動する";
var S2 = After;
R_S(20157,Number);
Rewind = 20157;
Before = 20182;
Datas = [4,0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20184:
var C1 = "スターライト学園正門";
var S1 = C1+"へ移動";
Rewind = 0;
Datas = [4,0,0,0,Rewind,Before,Number,C1,S1,C2,S2,C3,S3,C4,S4];
Scene_type = "チョイス";
break;
case 20185:
Flag_reset();
R_S(Number,20241);
Get_ICF("人物","三ノ輪 ヒカリ","スターライト学園のアイドル。↓今回の事件の被害者。↓トロピカルジュースとロコモコが↓好物で、豆類が苦手。",14);
T_Name = Name;
Text = "「結局、得られる情報はこれ以上なさそうですね。」";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20186:
T_Name = "(先輩)";
Text = "「弁護士って、情報得るの大変だからね↓後は法廷で勝負しましょうか。」";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20187:
T_Name = "あかり";
Text = "「じゃあ、私たちもこの辺で↓失礼しますね。」";
Datas = [4,0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20188:
T_Name = "(先輩)";
Text = "「うん、ルミナスのみんな、ありがとうね。↓おかげで今日は楽しかったよ。」";
Datas = [4,0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20189:
T_Name = Name;
Text = "(人が死んでるのに気楽なもんだな…)";
Datas = [4,0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20190:
T_Name = Name;
Text = "(まあいい、今日は帰って寝るか…)";
Datas = [4,0,10,0,0,0,19,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20191:
Move(20192);
break;
case 20192:
T_Name = "1月5日 9時45分";
Text = "裁判所 被告人控室";
Before = 20190;
Datas = [6,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20193:
T_Name = "まどか";
Text = "「弁護士さん。↓今日はよろしくお願いしますね。」";
Datas = [6,0,0,0,22,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20194:
T_Name = Name;
Text = "「あ、ああ。任せときなよ。」";
Datas = [6,0,0,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20195:
T_Name = "まどか";
Text = "「あれ？弁護士さん、なんだか緊張してます？」";
Datas = [6,0,0,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20196:
T_Name = "(先輩)";
Text = "「"+Surname+"君、こう見えて弁護2回目の新人さんだからね。」";
Datas = [6,0,10,15,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20197:
T_Name = "まどか";
Text = "「へぇ。そうなんですか。」";
Datas = [6,0,10,0,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20198:
T_Name = "(先輩)";
Text = "「まどかちゃんは、どう？↓緊張してない？」";
Datas = [6,0,10,0,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20199:
T_Name = "まどか";
Text = "「はい！私はアイドルですからね。↓たくさんの人に見られるのは↓慣れてます。↓今日は何もしませんし。」";
Datas = [6,0,10,0,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20200:
T_Name = Name;
Text = "(そういうものだろうか…？)";
Datas = [6,0,10,0,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20201:
T_Name = "(先輩)";
Text = "「おっと！もう開廷時間だね。行くよ！"+Surname+"君！」";
Datas = [6,0,10,0,0,0,22,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20202:
Move(20203);
break;
case 20203:
T_Name = "同日 10時";
Text = "裁判所 第一法廷";
Before = 20201;
Datas = [7,0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20204:
T_Name = "裁判長";
Text = "「これより、天羽 まどかの法廷を↓開廷します。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20205:
T_Name = "(検事)";
Text = "「検察側、↓準備完了しております。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20206:
T_Name = Name;
Text = "「弁護側、↓準備完了しております。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20207:
T_Name = "裁判長";
Text = "「では…。えっと、なんでしたかな？」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20208:
T_Name = "(検事)";
Text = "「冒頭弁論だ。裁判長。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20209:
T_Name = "裁判長";
Text = "「おっと。そうでしたな。↓どうも緊張してしまって。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20210:
T_Name = Name;
Text = "「裁判長はベテランなのに、↓そういう事もあるんですね。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20211:
T_Name = "裁判長";
Text = "「えっ。それは、その…」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20212:
Scene_type = "異議あり！20213";
break;
case 20213:
T_Name = "(検事)";
Text = "「これから出てくるのはアイドル。↓有名人だ。それなりに緊張してもおかしくはなかろう。」";
Before = 20211;
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20214:
T_Name = "裁判長";
Text = "「まあ、そういうことです。↓では(検事)検事。↓気を取り直して冒頭弁論を。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20215:
T_Name = "(検事)";
Text = "「事件はアイドル学校↓スターライト学園の敷地内で発生した」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20216:
T_Name = "(検事)";
Text = "「学園はそれなりに警備が厳しい。↓これにより、検察側は学校関係者から容疑者を割り出し、逮捕した。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20217:
T_Name = "(検事)";
Text = "「容疑者の犯行であることを示す、↓証拠も準備している。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20218:
T_Name = "裁判長";
Text = "「なるほど。↓では、さっそく始めてもらいましょう。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20219:
T_Name = "(検事)";
Text = "「では、最初の証人の入廷を。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20220:
T_Name = "";
Text = "";
Datas = ["stand",0,0,0,24,15,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20221:
T_Name = "(検事)";
Text = "「証人。名前と職業を。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20222:
T_Name = "(刑事苗字)";
Text = "「自分は(刑事苗字) (刑事名前)。↓所轄署の殺人事件捜査担当の↓刑事ッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20223:
T_Name = "(検事)";
Text = "「(刑事苗字)刑事。↓まず事件の説明をお願いする。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20224:
T_Name = "(刑事苗字)";
Text = "「死体の発見は三日前の早朝。↓被害者友人のアイドルが第一発見者ッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20224:
T_Name = "(刑事苗字)";
Text = "「死体は、学園内の地下ステージで発見されたッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20225:
T_Name = "(検事)";
Text = "「被害者の死因は？」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20226:
T_Name = "(刑事苗字)";
Text = "「服毒による、中毒死ッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20227:
T_Name = Name;
Text = "(…珍しい。先輩の勘が当たったぞ)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20228:
T_Name = "裁判長";
Text = "「なるほど。毒殺ですか。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20229:
T_Name = "(検事)";
Text = "「それでは、被告人がどのようにして↓毒を盛ったかを証言してもらおう！」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20230:
T_Name = "証言開始";
Text = "～被告人が毒をもった方法～";
Datas = ["stand",0,25,30,24,0,26,30,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20231:
T_Name = "(刑事苗字)";
Text = "「まず、被告人は被害者の後輩ッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20232:
T_Name = "(刑事苗字)";
Text = "「後輩なら先輩に↓弁当を持っていくことぐらいは↓当然ッス！」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20233:
T_Name = "(刑事苗字)";
Text = "「被告人は、地下ステージへ弁当を↓持って行ったッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20234:
T_Name = "(刑事苗字)";
Text = "「その弁当に毒を盛ったに↓違いないッス！」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20235:
T_Name = "裁判長";
Text = "「ふむぅ…。お弁当に毒を…。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20236:
T_Name = "裁判長";
Text = "「しかし、↓えらく単純な証言でしたね。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20237:
T_Name = "(刑事苗字)";
Text = "「最初ッスからね。↓こんなもんッスよ。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20238:
T_Name = Name;
Text = "(なんだよ。それ。)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20239:
T_Name = "裁判長";
Text = "「では、弁護人。尋問を。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20240:
T_Name = Name;
Text = "「はい。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20241:
T_Name = "尋問開始";
Text = "～被告人が毒をもった方法～";
After = Skip+1;
Skip = 0;
Datas = ["stand",0,12,30,24,0,13,30,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20242:
Get_ICF("フラグ","先輩がいる");
R_S(Number,0);
T_Name = "(刑事苗字)";
Text = "「まず、被告人は被害者の後輩ッス。」";
Datas = [24,T_Name,Text,20246,Before,Number,After,0,"無"];
Scene_type = "尋問";
break;
case 20243:
T_Name = "(刑事苗字)";
Text = "「後輩なら先輩に↓弁当を持っていくことぐらいは↓当然ッス！」";
Datas = [24,T_Name,Text,20248,Before,Number,After,0,"無"];
Scene_type = "尋問";
break;
case 20244:
T_Name = "(刑事苗字)";
Text = "「被告人は、地下ステージへ弁当を↓持って行ったッス。」";
Datas = [24,T_Name,Text,20256,Before,Number,After,20274,"引換券"];
Scene_type = "尋問";
break;
case 20245:
T_Name = "(刑事苗字)";
Text = "「その弁当に毒を盛ったに↓違いないッス！」";
After = 20272;
Datas = [24,T_Name,Text,20265,Before,Number,After,0,"無"];
Scene_type = "尋問";
break;
case 20246:
R_S(Number,20243);
T_Name = Name;
Text = "「それが、どうかしましたか？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20247:
T_Name = "(刑事苗字)";
Text = "「せっかちッスね。↓これから言うッスよ。」";
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20248:
R_S(Number,20244);
T_Name = Name;
Text = "「そうでしょうか？↓"+Person+"はそんな経験ありませんよ。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20249:
T_Name = "(先輩)";
Text = "「確かに、ないわね。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20250:
T_Name = "(刑事苗字)";
Text = "「そんな！？↓自分は先輩にも、(検事)検事殿にも↓持って行ってるッスよ！？」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20251:
T_Name = "(検事)";
Text = "「それはキミが勝手にやっているだけだ刑事。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20252:
T_Name = "(刑事苗字)";
Text = "「じゃ、じゃあ、自分が先輩になった時には…？」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20253:
T_Name = "(先輩)";
Text = "「貰えないでしょうね。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20254:
T_Name = "(刑事苗字)";
Text = "「そんな…じゃあ今までの弁当代は…↓それに、この証言にも矛盾が…」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20255:
T_Name = "(刑事苗字)";
Text = "「…いや！きっと被告人は↓自分と同じタイプの人間だったッス！↓そうに違いないッス！↓つまり…」";
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20256:
R_S(Number,20245);
T_Name = Name;
Text = "「その証拠はありますか？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20257:
T_Name = "(刑事苗字)";
Text = "「そんなもんねぇッス！」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20258:
T_Name = Name;
Text = "「…はい？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20259:
T_Name = "(刑事苗字)";
Text = "「証拠はないと言ったッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20260:
T_Name = Name;
Text = "「いやいや、↓開き直らないでくださいよ！」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20261:
T_Name = "(検事)";
Text = "「こちらとしてはあるのだが…。↓このタイミングで出すのも馬鹿馬鹿しいな。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20262:
T_Name = Name;
Text = "(そりゃそうだろうが…)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20263:
T_Name = "(刑事苗字)";
Text = "「検事殿もああいってるし↓そもそも持って行ってないという証拠も無いッスからね。↓問題なしッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20264:
T_Name = Name;
Text = "(持って行ってない証拠はない…か)";
Last();
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20265:
R_S(Number,20272);
T_Name = Name;
Text = "「ちなみに、どんなお弁当だったんですか？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20266:
T_Name = "(刑事苗字)";
Text = "「えっと…。どんなだったッスか？↓(検事)検事。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20267:
T_Name = "(検事)";
Text = "「……………………」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20268:
T_Name = Name;
Text = "(恐ろしい顔で刑事を睨んでるな…。)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20269:
T_Name = "(刑事苗字)";
Text = "「ヒッ…。↓け、検事殿は弁当の中身など事件に関係ないと言ってるッス！」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20270:
T_Name = "(刑事苗字)";
Text = "「この話は終わりッスよ！」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20271:
T_Name = Name;
Text = "(確かに、中身は今関係ないか…)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Last();
Scene_type = "メイン";
break;
case 20272:
R_S(Number,20242);
T_Name = Name;
Text = "「今問題なのは”被告人が↓地下ステージに弁当を持って行ったか”ですね。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20273:
T_Name = "(先輩)";
Text = "「そうね、持って行っていないという↓証拠を提供しましょう。」";
Last();
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20274:
R_S(Number,20310);
T_Name = Name;
Text = "「証人。これが何かおわかりですか？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",16];
Scene_type = "メイン";
break;
case 20275:
T_Name = "(刑事苗字)";
Text = "「引換券ッスか？自分も持ち合わせがない時使うッス。↓しょっちゅうッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0100,0100,15",16];
Scene_type = "メイン";
break;
case 20276:
T_Name = Name;
Text = "「そう。これは引換券です。↓ただし、あなたがいつも使っている店のものではない。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,0",16];
Scene_type = "メイン";
break;
case 20277:
T_Name = Name;
Text = "「調査で地下ステージに入る時、↓スタッフにりんごと交換してもらったんですよ。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20278:
T_Name = "(刑事苗字)";
Text = "「りんごと引換券をッスか？確かに、↓自分がやっているのは逆ッスね。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20279:
T_Name = Name;
Text = "「で、この券はそのりんごを返して貰う為の券なんですよ。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20280:
T_Name = "(刑事苗字)";
Text = "「りんごを預けたってことッスか？↓なんでわざわざ。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20281:
T_Name = Name;
Text = "「それはですね証人。あの地下ステージは飲食禁止だからですよ！」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20282:
T_Name = "(刑事苗字)";
Text = "「えええッ！」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20283:
T_Name = Name;
Text = "「毒の入ったお弁当を、飲食禁止の場所へもっていく…」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20284:
T_Name = Name;
Text = "「そんなことをしては、スタッフに止められて犯行が明るみになってしまいます！」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20285:
T_Name = "(刑事苗字)";
Text = "「た、確かに…自分でもそんなことは避けるッス…」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20286:
Scene_type = "異議あり！20287";
break;
case 20287:
T_Name = "(検事)";
Text = "「なにが確かにだ。そのことについては確認をとっただろう。」";
Before = 20285;
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20288:
T_Name = "(刑事苗字)";
Text = "「そうでしたっけ？」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20289:
T_Name = "(検事)";
Text = "「まったく…いいか？事件発生時、被害者が毒を摂取したとしたらいつだ？」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20290:
T_Name = Name;
Text = "「発見時が三日前だから、四日前くらいでしょうか？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20291:
T_Name = "(検事)";
Text = "「そうだ。↓それはつまりお正月なのだよ。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20292:
T_Name = Name;
Text = "「ま、まさか…お正月休みでスタッフはいなかったとか…」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20293:
T_Name = "(検事)";
Text = "「いや、スタッフはいた。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20294:
T_Name = Name;
Text = "「…？じゃあ、↓やっぱりとめられるのでは？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20295:
T_Name = "(検事)";
Text = "「スタッフが証言してくれたよ…↓年に一度のおせち料理だから、特別に通した、とね。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20296:
T_Name = Name;
Text = "「おせち料理？被告人が持って行ったのはお弁当だったのでは？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20297:
T_Name = "(刑事苗字)";
Text = "「いやーすまねッス。↓おせち料理なんて縁がないからすっかり忘れてたッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20298:
T_Name = "(刑事苗字)";
Text = "「そういえば、学園が用意したおせち料理で全生徒に配るのを被告人に頼んだと言う話だったッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20299:
T_Name = Name;
Text = "「全生徒にですか？それはちょっと重労働なのでは…？」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20300:
T_Name = "(検事)";
Text = "「それについては新しく証言として話していただこう。」";
Datas = ["right",0,0,0,0,0,11,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20301:
T_Name = "裁判長";
Text = "「それでは、”おせち料理について”↓証言をお願いします。↓(刑事苗字)刑事。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20302:
T_Name = "(刑事苗字)";
Text = "「承知ッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20303:
T_Name = "証言開始";
Text = "～おせち料理について～";
Datas = ["stand",0,25,30,24,0,26,30,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20304:
T_Name = "(刑事苗字)";
Text = "「被告人が持ち込んだのは↓おせち料理だったッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20305:
T_Name = "(刑事苗字)";
Text = "「これは学園が用意したもので、↓全生徒分あったッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20306:
T_Name = "(刑事苗字)";
Text = "「それを配るのは大変ッスから、何人かの生徒に手伝ってもらったそうッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20307:
T_Name = "(刑事苗字)";
Text = "「そして、学園には一部の者しか入れない場所がいくつかあるッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20308:
T_Name = "(刑事苗字)";
Text = "「それに対しては、学園は対応できる者におせちを渡した、とのことッス。」";
After = 20308.1;
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20308.1:
T_Name = "(刑事苗字)";
Text = "「そのうちの一人が、↓被告人だったッス。」";
B_A(20308,20308.2);
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20308.2:
T_Name = "(刑事苗字)";
B_A(20308.1,20308.3);
Text = "「おせち料理は年に一度の↓特別なものッスから、↓飲食禁止の場所でも許されたッス。」";
Datas = ["stand",0,27,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20308.3:
T_Name = "裁判長";
Text = "「なるほど。そういうことですか。」";
B_A(20308.2,20309);
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20309:
T_Name = "裁判長";
Text = "「なるほど。そういうことですか。↓では弁護人。尋問を。」";
B_A(20308.3,20310);
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20310:
T_Name = "尋問開始";
Text = "～おせち料理について～";
After = Skip+1;
Skip = 0;
Datas = ["stand",0,12,30,24,0,13,30,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20311:
R_S(Number,0);
T_Name = "(刑事苗字)";
Text = "「被告人が持ち込んだのは↓おせち料理だったッス。」";
After = 20317;
Datas = [24,T_Name,Text,20312,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case 20312:
R_S(Number,20317);
T_Name = Name;
Text = "「さっきと言ってることが違うじゃないですか。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20313:
Rewind = 0;
Text = "「いや、そんなことはないッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20314:
T_Name = Name;
Text = "「え。」";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20315:
T_Name = Name;
Text = "「さっきは思わず謝っちまったッスが↓よく考えたらおせちなんて弁当の一種ッス！↓箱に入ってるし。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20316:
T_Name = Name;
Text = "「…」↓(そんな気もしてきた)";
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20317:
R_S(Number,0);
T_Name = "(刑事苗字)";
Text = "「これは学園が用意したもので、↓全生徒分あったッス。」";
Before = 20311;
Datas = [24,T_Name,Text,20317.2,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case 20317.2:
R_S(Number,20318);
T_Name = Name;
Text = "「全生徒って、何人なんですか？」";
B_A(0,20317.3);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20317.3:
Rewind = 0;
B_A(20317.2,20317.4);
Text = "「たくさんッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20317.4:
T_Name = Name;
Text = "「たくさん。」";
B_A(20317.3,20317.5);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20317.5:
T_Name = Name;
Text = "「そう。たくさんッス。」";
B_A(20317.4,20318);
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20318:
T_Name = "(刑事苗字)";
Text = "「それを配るのは大変ッスから、何人かの生徒に手伝ってもらったそうッス。」";
Datas = [24,T_Name,Text,20318.2,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case 20318.2:
R_S(Number,20319);
T_Name = Name;
Text = "「何人かとは？」";
B_A(0,20318.3);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20318.3:
Rewind = 0;
B_A(20318.2,20318.4);
Text = "「何人かッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20318.4:
T_Name = Name;
Text = "「何人か。」";
B_A(20318.3,20318.5);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20318.5:
T_Name = Name;
Text = "「そう。何人かッス。」";
B_A(20318.4,20319);
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20319:
T_Name = "(刑事苗字)";
Text = "「そして、学園には一部の者しか入れない場所がいくつかあるッス。」";
Datas = [24,T_Name,Text,20319.2,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case 20319.2:
R_S(Number,20320);
T_Name = Name;
Text = "「地下ステージ以外にはどんな？」";
B_A(0,20319.3);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20319.3:
Rewind = 0;
B_A(20319.2,20319.4);
Text = "「そうッスね。生徒たちの寮の部屋とかッス。」";
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20319.4:
T_Name = Name;
Text = "(それを入れたら”いくつか”では済まないと思うが…)";
B_A(20319.3,20319.5);
Last();
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20320:
T_Name = "(刑事苗字)";
Text = "「それに対しては、学園は対応できる者におせちを渡した、とのことッス。」";
Datas = [24,T_Name,Text,20320.2,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;

case 20320.2:
R_S(Number,20321);
T_Name = Name;
Text = "「では、そのうちの一人が…？」";
B_A(0,20320.3);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20320.3:
Rewind = 0;
B_A(20320.2,20319.4);
Text = "「そうッス。」";
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20321:
T_Name = "(刑事苗字)";
Text = "「そのうちの一人が、↓被告人だったッス。」";
if(have("被告人は地下ステージに入れた")) After = 20321.7;
Datas = [24,T_Name,Text,20321.1,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case 20321.1:
R_S(Number,20321.4);
T_Name = Name;
Text = "「つまり、被告人は地下ステージへ入ることが出来た、ということですか？」";
B_A(0,20321.2);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20321.2:
T_Name = "(刑事苗字)";
Text = "「そういうことッスね。」";
Rewind = 0;
B_A(20321.1,20321.3);
if(have("被告人は地下ステージに入れた")){
  After = 20321.7;
  Skip = 0;
}
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20321.3:
T_Name = Name;
Text = "(どうする？これは重要な証言だぞ。)";
B_A(20321.2,20321.4);
Last();
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20321.4:
B_A(20321.3,20321.5);
Datas = ["left",S_image,10,0,Rewind,Before,Number,"証言に加える",20321.41,"やめとく",After];
Scene_type = "チョイス";
break;

case 20321.41:
Get_ICF("フラグ","被告人は地下ステージに入れた")
R_S(Number,20321.7);
T_Name = Name;
Text = "「裁判長！今の発言は非常に重要です。↓証言に付け加えてください。」";
B_A(0,20321.42);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20321.42:
T_Name = "裁判長";
Text = "「わかりました。↓証人は証言を付け加える様に。」";
Rewind = 0;
B_A(20321.41,20321.43);
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20321.43:
T_Name = "(刑事苗字)";
Text = "「了解ッス。」";
B_A(20321.42,20321.7);
Last();
Datas = ["stand",0,0,0,24,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20321.5:
R_S(Number,20322);
T_Name = Name;
Text = "(やめておくか)";
B_A(0,20321.6);
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case 20321.6:
T_Name = Name;
Text = "「証人！証言を続けてください。」";
B_A(20321.5,0);
Rewind = 0;
Last();
Datas = ["left",0,S_image,0,10,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;

case 20321.7:
T_Name = "(刑事苗字)";
Text = "「つまり、被告人は地下ステージに入ることが出来たッス。」";
B_A(20321,20322);
Datas = [24,T_Name,Text,0,Before,Number,After,0,"地下ステージのドア"];
Scene_type = "尋問";
break;

case 20322:
T_Name = "(刑事苗字)";
Text = "「おせち料理は年に一度の↓特別なものッスから、↓飲食禁止の場所でも許されたッス。」";
if(have("被告人は地下ステージに入れた")) Before = 20321.7;
Datas = [24,T_Name,Text,0,Before,Number,After,0,"無し"];
Scene_type = "尋問";
break;
case "調べる20183":
R_S(Number,20185);
T_Name = Name;
Text = "「遺体のあった場所だ。↓この光景を見るのは二度目だな。」";
Before = 0;
After = "調べる20183_2";
Datas = [4,0,S_image,0,0,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_2":
T_Name = "(先輩)";
Text = "「ではここで"+Surname+"君に問題だ。↓被害者の死因は？」";
Rewind = 0;
Before = "調べる20183";
After = "調べる20183_3";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_3":
T_Name = Name;
Text = "「それを断定するには、↓データが足りないですね。」";
Before = "調べる20183_2";
After = "調べる20183_4";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_4":
T_Name = "(先輩)";
Text = "「ブッブー。答えは”毒殺”です。↓さあ、メモったメモった。」";
Before = "調べる20183_3";
After = "調べる20183_5";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_5":
T_Name = Name;
Text = "「…一応、理由を聞きましょう。」";
Before = "調べる20183_4";
After = "調べる20183_6";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_6":
T_Name = "(先輩)";
Text = "「まず、この床。綺麗すぎます。↓撲殺なら血痕が残っているはずだから違う。」";
Before = "調べる20183_5";
After = "調べる20183_7";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_7":
T_Name = Name;
Text = "「それで？」";
Before = "調べる20183_6";
After = "調べる20183_8";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_8":
T_Name = "(先輩)";
Text = "「後は…弁護士としての勘よ！」";
Before = "調べる20183_7";
After = "調べる20183_9";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_9":
T_Name = Name;
Text = "「それじゃ、断定はできないので↓メモの必要はないですね。」↓(先輩の勘は当たらないし。)";
Before = "調べる20183_8";
After = "調べる20183_10";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_10":
T_Name = "(先輩)";
Text = "「…じゃあこれはメモっときなさい。↓好きな食べ物はトロピカルジュース、↓ロコモコ。↓苦手な食べ物は豆類、↓特にグリーンピースと納豆よ。」";
Before = "調べる20183_9";
After = "調べる20183_11";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_11":
T_Name = Name;
Text = "「…情報源は？」";
Before = "調べる20183_10";
After = "調べる20183_12";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_12":
T_Name = "(先輩)";
Text = "「今ググったわ。プロフィールに書いて↓あったから間違いないわよ。↓さあ、メモメモ。」";
Before = "調べる20183_11";
After = "調べる20183_13";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_13":
T_Name = Name;
Text = "「わかりましたよ…。」";
Before = "調べる20183_12";
After = "調べる20183_14";
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20183_14":
Get_ICF("人物","三ノ輪 ヒカリ","スターライト学園のアイドル。↓今回の事件の被害者。↓トロピカルジュースとロコモコが↓好物で、豆類が苦手。",14);
T_Name = "";
Text = "三ノ輪 ヒカリの情報を書き加えた。";
Before = "調べる20183_12";
After = Skip;
Skip = 0;
Datas = [4,0,S_image,0,0,0,10,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20142":
R_S(Number,"調べる");
T_Name = "？？？";
Text = "「なんだ？入学希望か？↓なら俺が話をするぜYeah!」";
After = Number + "_2"
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20142_2":
T_Name = Name;
Text = "「いやいや、違います！」";
Rewind = 0;
Before = "調べる20142";
After = Skip;
Skip = 0;
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20142":
R_S(Number,20142);
T_Name = "？？？";
Text = "「ワッツ？なんだ、それは？」";
After = "つきつける弁護士バッジ20142_2";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0100,0100,15",1];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20142_2":
T_Name = Name;
Text = "「弁護士バッジです。↓"+Person+"が弁護士であると証明してくれる物なんですよ」";
Rewind = 0;
Before = "つきつける弁護士バッジ20142";
After = "つきつける弁護士バッジ20142_3";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0100,0100,0",1];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20142_3":
T_Name = "？？？";
Text = "「それで？弁護士である証明はできたが↓天羽ハニーの弁護士である証明はどうするんだ？」";
Before = "つきつける弁護士バッジ20142_2";
After = "つきつける弁護士バッジ20142_4";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20142_4":
T_Name = Name;
Text = "「…もうちょっと考えてきます。」";
Before = "つきつける弁護士バッジ20142_3";
After = Skip;
Skip = 0;
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつけるりんご20142":
R_S(Number,20142);
T_Name = "？？？";
Text = "「それは氷上ハニーのりんごだな。」";
After = "つきつけるりんご20142_2";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0100,0100,15",3];
if(Scene_type != "アイテム") Scene_type = "メイン";
break;
case "つきつけるりんご20142_2":
T_Name = Name;
Text = "「わかるんですね。」";
Rewind = 0;
Before = "つきつけるりんご20142";
After = "つきつけるりんご20142_3";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0100,0100,0",3];
Scene_type = "メイン";
break;
case "つきつけるりんご20142_3":
T_Name = "？？？";
Text = "「俺はギャラクシー1のティーチャーだからな。↓ハニーたちの事はなんでも知ってるぜ！」";
Before = "つきつけるりんご20142_2";
After = "つきつけるりんご20142_4";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつけるりんご20142_4":
T_Name = "(先輩)";
Text = "「じゃあ、事件の真犯人とかも知ってるんですか？」";
Before = "つきつけるりんご20142_3";
After = "つきつけるりんご20142_5";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつけるりんご20142_5":
T_Name = "？？？";
Text = "「もちろんだぜ！Yeah!」";
Before = "つきつけるりんご20142_4";
After = "つきつけるりんご20142_6";
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつけるりんご20142_6":
T_Name = Name;
Text = "「…。」↓(先生だったのか)";
Before = "つきつけるりんご20142_5";
After = Skip;
Skip = 0;
Datas = [3,0,0,0,23,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつけるりんご20094":
R_S(Number,20094);
T_Name = "まどか";
Text = "「あ、りんご。ちょうど今小腹が空いてるんですよね。」";
After = Number+"_2";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip,"0900,0250,15",3];
if(Scene_type != "アイテム") Scene_type = "メイン";
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
Text = "「手に入れたアイテムは↓すぐ使ってみたくなる性分なもので。」";
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
if(Scene_type != "アイテム") Scene_type = "メイン";
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
Text = "「この行為には何の意味もないけどね。↓見て弁護士バッジだってわかる人少ないし。」";
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
Text = "「まどかちゃんはどう？↓学生証とか、あんまり使ってないんじゃない？」";
Before = "つきつける弁護士バッジ20094_4";
After = "つきつける弁護士バッジ20094_6";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "つきつける弁護士バッジ20094_6":
T_Name = "まどか";
Text = "「アイカツシステムの起動に必要なので、↓ライブのたびに使ってますね。」";
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
Text = "「トンネルを掘る道具よ。↓わからなかったらすぐ調べなさい！↓現代っ子の常識でしょう。」";
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
Text = "「長時間座ることが多いからでしょうか。↓かなりいいですよ。」";
Rewind = 0;
Before = "調べる20094椅子";
After = "調べる20094椅子3";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20094椅子3":
T_Name = Name;
Text = "「やっぱり そうなんだ。↓一度座ってみたいなぁ」";
Before = "調べる20094椅子2";
After = "調べる20094椅子4";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20094椅子4":
T_Name = "まどか";
Text = "「あかり先輩のライブに銃を持って乱入とかしたら↓すぐに座れると思いますよ。」";
Before = "調べる20094椅子3";
After = "調べる20094椅子5";
Datas = ["留置所",0,S_image,0,22,0,0,0,T_Name,Text,Rewind,Before,Number,After,Skip];
Scene_type = "メイン";
break;
case "調べる20094椅子5":
T_Name = Name;
Text = "「…それだと、↓刑務所の住み心地も知る羽目になるからやだよ。」";
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
Text = "「今の証言はこの証拠品と明らかに↓矛盾しています！」";
Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗2",0];
if(have("先輩がいる")) Datas[4] = 10;
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
if(have("先輩がいる")) Datas[4] = 10;
Scene_type = "メイン";
break;
case "つきつけ失敗4":
T_Name = Name;
Text = "「…」";
Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗5",0];
if(have("先輩がいる")) Datas[4] = 10;
Scene_type = "メイン";
break;
case "つきつけ失敗5":
T_Name = "裁判長";
Text = "「弁護人はもっと考えて↓発言するように。」";
Datas = ["裁判長",0,0,0,0,0,0,0,T_Name,Text,0,0,0,"つきつけ失敗6",0];
Scene_type = "メイン";
break;
case "つきつけ失敗6":
T_Name = Name;
Flag[6]--;
Text = "(失敗したみたいだ…。)↓↓(残り"+Flag[6]+"回)";
if(Flag[6]==0) After = "つきつけ失敗7";
else After = Flag[4];
Datas = ["left",0,S_image,0,0,0,0,0,T_Name,Text,0,0,0,After,0];
if(have("先輩がいる")){
  Datas[4] = 10;
  Datas[9] = Text = "(失敗したみたいだ…。↓先輩も、止めてくれよ…)↓↓(残り"+Flag[6]+"回)";
}
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

function Inspect_loads2(Number,XXX,YYY){
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
case 20142:
Inspect = [3,0,0,1600,900,"調べる"+Number];
break;
case 20155:
Inspect = [3,381,39,330,312,"調べる"+Number];
break;
case 20183:
Inspect = [4,1085,849,835,231,"調べる"+Number];
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
