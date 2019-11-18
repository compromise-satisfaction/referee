
var Rewind = 0;
var Skip = 0;
var Before = 0;
var After = 0;
var Datas = [];
var DATAS = 0;
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
else if(b=="書き換え"){
  if(i==Character_Flag.length) return;
  Character_Flag[i][0] = c;
}
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
else if(b=="書き換え"){
  if(i==Item_Flag.length) return;
  Item_Flag[i][0] = c;
}
else Item_Flag[i] = [a,b,c,d,e];
}
return;
}//アイテム関連

function Scene_loads2(Number,Item,get){
console.log(Number);
if(Number==1){
  Item_Flag = [];
  Character_Flag = [];
  Flag_reset();
}
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
if(Item){
Number = Item+Number;
console.log(Number);
Scene_loads2(Number,false,false);
Scene_type = "アイテム";
return;
}
Rewind = Flag[3];
Skip = Flag[5];
Before = Number-1;
After = Number+1;
if(Rewind==Before) Rewind = 0;
if(Skip==After) Skip = 0;
if(Number=="タイトルに戻る"){
Scene_type = Number;
return;
}
if(Number=="調べる"){
Get_Datas();
Scene_type = Number;
return;
}
if(Number=="調べる出来てない"){
  T_Name = "";
  Text = "データが存在しないようだ。";
  Datas[0] = "Black";
  Datas[1] = 0;
  Datas[2] = 0;
  Datas[3] = 0;
  Datas[4] = 0;
  Datas[5] = 0;
  Datas[6] = 0;
  Datas[7] = "";
  Datas[8] = Text;
  Datas[9] = 0;
  Datas[10] = 0;
  Datas[11] = Number;
  Datas[12] = "調べる";
  Datas[13] = 0;
  Scene_type = "メイン";
  return;
}
if(Number=="調べる何もない"){
  T_Name = "";
  Text = "特に気になるものはない。";
  Datas[1] = 0;
  Datas[2] = 0;
  Datas[3] = 0;
  Datas[4] = 0;
  Datas[5] = 0;
  Datas[6] = 0;
  Datas[7] = "";
  Datas[8] = Text;
  Datas[9] = 0;
  Datas[10] = 0;
  Datas[11] = Number;
  Datas[12] = "調べる";
  Datas[13] = 0;
  Scene_type = "メイン";
  return;
}
if(Number=="ゲームオーバー"){
Datas = ["stand",0,0,0,0,0,Number,"タイトルに戻る","タイトルに戻る","セーブ読み込み","セーブ読み込み"];
if(Flag[8]) Datas[9] = 0;
Scene_type = "チョイス";
return;
}
for (var i = 0; i < DATAS.length; i++) {
  if(DATAS[i].Number==Number){
    Scene_type = DATAS[i].type;
    break;
  }
}
if(i==DATAS.length){
if(Number.length>5){
  if(Number.substring(0,5)=="つきつける"){
    T_Name = "";
    Text = "反応がない。";
    if(Scene_type == "メイン"){
    Datas = [Datas[0],Datas[2],0,Datas[4],0,Datas[6],0,"",Text,0,0,0,Flag[4],0];
    }
    if(Scene_type == "チョイス"){
    Datas = [Datas[0],Datas[1],0,Datas[2],0,Datas[3],0,"",Text,0,0,0,Flag[4],0];
    }
    Scene_type = "メイン";
    return;
  }
}
if(Number.length>2){
  if(Number.substring(0,2)=="使う"){
    T_Name = "";
    Text = "ここでは使えないようだ。";
    if(Scene_type == "メイン"){
    Datas = [Datas[0],Datas[2],0,Datas[4],0,Datas[6],0,"",Text,0,0,0,Flag[4],0];
    }
    if(Scene_type == "チョイス"){
    Datas = [Datas[0],Datas[1],0,Datas[2],0,Datas[3],0,"",Text,0,0,0,Flag[4],0];
    }
    Scene_type = "メイン";
    return;
  }
}
Datas = ["Black",0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,Flag[4],0];
Scene_type = "メイン";
return;
}
if(Scene_type=="メイン"){
  Datas[0] = DATAS[i].Datas0;
  Datas[1] = DATAS[i].Datas1;
  Datas[2] = DATAS[i].Datas2;
  Datas[3] = DATAS[i].Datas3;
  Datas[4] = DATAS[i].Datas4;
  Datas[5] = DATAS[i].Datas5;
  Datas[6] = DATAS[i].Datas6;
  Datas[7] = DATAS[i].Datas7.replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/,Name);
  Datas[8] = DATAS[i].Datas8.replace(/\n/g,"↓").replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/g,Name).replace(/\(一人称\)/g,Person);
  Datas[9] = DATAS[i].Datas9;
  Datas[10] = DATAS[i].Datas10;
  Datas[11] = DATAS[i].Datas11;
  Datas[12] = DATAS[i].Datas12;
  Datas[13] = DATAS[i].Datas13;
  Datas[14] = DATAS[i].Datas14;
  Datas[15] = DATAS[i].Datas15;
  Datas[16] = DATAS[i].Datas16;
  if(Datas[1]=="主人公") Datas[1] = Datas[1] = S_image;
  if(Datas[3]=="主人公") Datas[3] = Datas[3] = S_image;
  if(Datas[5]=="主人公") Datas[5] = Datas[5] = S_image;
}
else if(Scene_type=="チョイス"){
  Datas[0] = DATAS[i].Datas0;
  Datas[1] = DATAS[i].Datas1;
  Datas[2] = DATAS[i].Datas2;
  Datas[3] = DATAS[i].Datas3;
  Datas[4] = DATAS[i].Datas4;
  Datas[5] = DATAS[i].Datas5;
  Datas[6] = DATAS[i].Datas6;
  Datas[7] = DATAS[i].Datas7;
  Datas[8] = DATAS[i].Datas8;
  Datas[9] = DATAS[i].Datas9;
  Datas[10] = DATAS[i].Datas10;
  Datas[11] = DATAS[i].Datas11;
  Datas[12] = DATAS[i].Datas12;
  Datas[13] = DATAS[i].Datas13;
  Datas[14] = DATAS[i].Datas14;
  Datas[15] = DATAS[i].Datas15;
  Datas[16] = DATAS[i].Datas16;
  if(Datas[1]=="主人公") Datas[1] = Datas[1] = S_image;
  if(Datas[2]=="主人公") Datas[2] = Datas[3] = S_image;
  if(Datas[3]=="主人公") Datas[3] = Datas[5] = S_image;
}
else if(Scene_type=="分岐"){
  if(have(DATAS[i].Datas0)){
    Number = DATAS[i].Datas1;
  }
  else {
    Number = DATAS[i].Datas2;
  }
  Scene_loads2(Number,false,false);
}
else if (Scene_type=="移動") {
  Move(DATAS[i].Datas0);
}
else if(Scene_type=="アイテムゲット"){
  Scene_type = [DATAS[i].Datas0,DATAS[i].Datas1,DATAS[i].Datas2];
}
if(DATAS[i].get!=false){
  GET = DATAS[i].get.split("\n");
    for (var l = 0; l < GET.length; l++) {
      for (var k = 0; k < DATAS.length; k++) {
        if(DATAS[k].Number==GET[l]) break;
      }
      Get_ICF(DATAS[k].type,DATAS[k].Datas0,DATAS[k].Datas1.replace(/\n/g,"↓").replace(/\(一人称\)/g,Person),DATAS[k].Datas2,DATAS[k].Datas3);
    }
  }
}

function Inspect_loads2(Number,XXX,YYY){
console.log("調べる"+Number);
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
for (var i = 0; i < DATAS.length; i++) {
  if(DATAS[i].Number=="調べる"+Number){
    Inspect = [DATAS[i].type,DATAS[i].Datas0,DATAS[i].Datas1,DATAS[i].Datas2,DATAS[i].Datas3,DATAS[i].Datas4,DATAS[i].Datas5,DATAS[i].Datas6,DATAS[i].Datas7,DATAS[i].Datas8,DATAS[i].Datas9];
    break;
  }
}
if(i==DATAS.length){
Inspect = ["Black"];
}
return(Inspect);
switch (Number) {//ここを変える調べる
case 20183:
Inspect = [4,1085,849,835,231,"調べる"+Number];
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
