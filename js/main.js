enchant()

function Load(width,height){
  var core = new Core(width, height);
  core.preload("image/融合.png");
  core.preload("sound/Item.wav");
  core.preload("image/left.png");
  core.preload("image/Round.png");
  core.preload("image/title.png");
  core.preload("image/right.png");
  core.preload("image/white.png");
  core.preload("image/stand.png");
  core.preload("image/留置所.png");
  core.preload("sound/Choice.wav");
  core.preload("image/Buttons.png");
  core.preload("image/待った！.png");
  core.preload("sound/待った！.wav");
  core.preload("sound/Trophies.wav");
  //core.preload("sound/プライド.wav");
  //core.preload("sound/永遠の灯.wav");
  //core.preload("sound/偶然、必然。.wav");
  core.preload("image/Trophies.png");
  core.preload("image/背景/left.png");
  core.preload("image/異議あり！.png");
  core.preload("sound/異議あり！.wav");
  core.preload("image/カットイン.png");
  core.preload("image/背景/stand.png");
  core.preload("image/背景/Black.png");
  core.preload("image/背景/right.png");
  core.preload("image/背景/裁判長.png");
  core.preload("image/背景/留置所.png");
  core.preload("image/Background.png");
  core.preload("image/背景/透明.png");
  core.preload("image/背景/カットイン.png");
  core.preload("image/Set_button.png","image/stone.png","image/Hand.png","image/V_or_D.png");

  for (var i = 1; i <= 10; i++){
    core.preload("image/背景/"+i+".png");
  }
  for (var i = 1; i <= 33; i++){
    core.preload("image/正方形/"+i+".png");
  }
  for (var i = 1; i <= 31; i++){
    core.preload("image/人物/"+i+".png");
  }
  core.fps = 10;
  core.onload = function(){

    var XXX = width;
    var YYY = width/16*9;
    var Rotation_Y = 0;

    function vue(){
          fetch(
            "https://script.google.com/macros/s/AKfycbzSdN3_6l87Bbn58AFWgq7lFnI27blOi7jWn0JdWYVRaGZWwOSd/exec",
          )
          .then(res => res.json())
          .then(result => {
            DATAS = result;
          },);
    }

    function BGM_Stop(Pause){
      return;
      if(Pause){
        console.log("BGM_pause");
        core.assets["sound/プライド.wav"].pause();
        core.assets["sound/永遠の灯.wav"].pause();
        core.assets["sound/偶然、必然。.wav"].pause();
      }
      return;
    }

    function Sound_ON(Sound_Name,Play){
      switch (Sound_Name) {
        case "Choice":
          if(Flag[10]==false) Play = false;
          break;
        case "Trophies":
          if(Flag[11]==false) Play = false;
          break;
        case "Item":
          if(Flag[12]==false) Play = false;
          break;
        case "異議あり！":
          if(Flag[13]==false) Play = false;
          break;
        case "待った！":
          if(Flag[14]==false) Play = false;
          break;
          default:
          break;
      }
      if(Play) console.log(Sound_Name);
      if(Play) core.assets["sound/"+Sound_Name+".wav"].play();
      //else core.assets["sound/"+Sound_Name+".wav"].pause();
      return;
    }

    function Scene_loads(Number,Return,Item){
      if(DATAS==0){
        DATAS = core.scene_datas;
        if(DATAS==undefined) vue();
      }
      if(Number=="リバーシ") return;
      if(Number=="セーブ読み込み") Scene_type = Number;
      else Scene_loads2(Number,Item);
      //console.log(Scene_type);
      Sound_ON("Choice",true);
      switch (Scene_type) {
        case "直前":
          Scene_loads(Flag[4],false,false);
          break;
        case "読み込みエラー":
        case "メイン":
          core.replaceScene(MainScene(Return));
          break;
        case "アイテム":
          core.replaceScene(MainScene(false));
          break;
          case "移動":
            core.pushScene(MoveScene(10));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            break;
        case "フェードイン":
          Scene_loads(Moves,false,false);
          core.pushScene(MoveScene(-10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
          break;
        case "調べる":
          if(Number.length>5){
            if(Number.substring(0,6)=="アイテム使用"){
              Number = Number.substring(6).split(",");
              Flag[4] = Number[1];
              if(Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Flag[4] = Flag[4]*1;
              Number = Number[0];
              //console.log(Number);
              Inspect_loads(Number,false);
              return;
            }
          }
          Inspect_loads(Flag[4],false);
          break;
        case "チョイス":
          core.replaceScene(ChoiceScene());
          break;
        case "尋問":
          core.replaceScene(InterrogationScene());
          break;
        case "タイトルに戻る":
          core.replaceScene(TitleScene());
          break;
        case "セーブ読み込み":
          BGM_Stop(true);
          Scene_loads2(Load_Datas(),Item);
          switch (Scene_type) {
            case "読み込みエラー":
            case "メイン":
              core.replaceScene(MainScene(Return));
              break;
            case "アイテム":
              core.replaceScene(MainScene(false));
              break;
            case "調べる":
              if(Number.length>5){
                if(Number.substring(0,6)=="アイテム使用"){
                  Number = Number.substring(6).split(",");
                  Flag[4] = Number[1];
                  if(Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Flag[4] = Flag[4]*1;
                  Number = Number[0];
                  //console.log(Number);
                  Inspect_loads(Number,false);
                  return;
                }
              }
              Inspect_loads(Flag[4],false);
              break;
            case "チョイス":
              core.replaceScene(ChoiceScene());
              break;
            case "尋問":
              core.replaceScene(InterrogationScene());
              break;
          }
          break;
          case "異議あり！":
          core.pushScene(PopScene(Datas[0],"異議あり！"));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
            break;
            case "待った！":
            core.pushScene(PopScene(Datas[0],"待った！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
              break;
        default:
          if(Scene_type.length==3){
            core.pushScene(ItemgetScene(Scene_type[0],Scene_type[1],Scene_type[2]));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            return;
          }
          else{
            console.log("エラー");
          }
          break;
      }
      //console.log(Flag[4]);
    }

    function Inspect_loads(Number,Item){
      if(Item) core.replaceScene(InspectScene(Inspect_loads2("アイテム使用"+Item+","+Number),false));
      else core.replaceScene(InspectScene(Inspect_loads2(Number),false));
      return;
    }

    function Load_Datas(){
      Flag = window.localStorage.getItem("Flag").split(",");
      Datas = window.localStorage.getItem("Datas").split(",");
      Number = window.localStorage.getItem("Number");
      if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1;
      Item_Flag = window.localStorage.getItem("Item").split("端");
      Character_Flag = window.localStorage.getItem("Character").split("端");
      for (var i = 0; i < Item_Flag.length; i++){
        Item_Flag[i] = Item_Flag[i].split(",");
      }
      for (var i = 1; i < Item_Flag.length; i++){
        var Item_Flag2 = [];
        for (var k = 1; k < Item_Flag[i].length; k++){
          Item_Flag2[k-1] = Item_Flag[i][k];
          if(k==3) Item_Flag2[k-1] = Item_Flag2[k-1]*1;
        }
        Item_Flag[i] = Item_Flag2;
      }
      for (var i = 0; i < Item_Flag.length-1; i++) {
        Item_Flag2[i] = Item_Flag[i];
      }
      Item_Flag = Item_Flag2;
      if(Item_Flag == undefined) Item_Flag = [];
      for (var i = 0; i < Character_Flag.length; i++){
        Character_Flag[i] = Character_Flag[i].split(",");
      }
      for (var i = 1; i < Character_Flag.length; i++){
        var Character_Flag2 = [];
        for (var k = 1; k < Character_Flag[i].length; k++){
          Character_Flag2[k-1] = Character_Flag[i][k];
          if(k==3) Character_Flag2[k-1] = Character_Flag2[k-1]*1;
        }
        Character_Flag[i] = Character_Flag2;
      }
      for (var i = 0; i < Character_Flag.length-1; i++) {
        Character_Flag2[i] = Character_Flag[i];
      }
      Character_Flag = Character_Flag2;
      if(Character_Flag == undefined) Character_Flag = [];
      for (var i = 3; i < Flag.length; i++){
        if(Flag[i]=="true") Flag[i] = true;
        else if(Flag[i]=="false") Flag[i] = false
        else if(Flag[i].replace(/\d/g,"").replace(/\./g,"")=="") Flag[i] = Flag[i]*1;
      }
      for (var i = 0; i < Datas.length; i++){
        if(Datas[i].replace(/\d/g,"").replace(/\./g,"")=="") Datas[i] = Datas[i]*1;
      }
      Pages = Flag[7].split("乙");
      Pages2 = Pages[1]*1;
      Pages = Pages[0]*1;
      //console.log(Number);
      return(Number);
    }

    //console.log(DATAS2);
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
    var OASOBI = false;

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
    //console.log(a,b,c,d,e);
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
    var Name = Flag[0];
    var Gender = Flag[2];
    var Surname = Flag[1];
    if(Gender=="男"){
    var www = ["僕","俺"];
    var Person = www[rand(1)];
    var S_image = 1;
    var S_image2 = 29;
    }
    else{
    var Person = "私";
    var S_image = 2;
    var S_image2 = 30;
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
    if(DATAS==undefined){
      //DATAS = DATAS2;
      vue();
      Datas = ["Black",0,0,0,0,0,0,"読み込みエラー","やり直してください。",0,0,0,"タイトルに戻る",0];
      Scene_type = "読み込みエラー";
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
        Datas = [Datas[0],Datas[1],0,Datas[3],0,Datas[5],0,"",Text,0,0,0,Flag[4],0];
        }
        if(Scene_type == "チョイス"){
        Datas = [Datas[0],Datas[1],0,Datas[2],0,Datas[3],0,"",Text,0,0,0,Flag[4],0];
        }
        Scene_type = "メイン";
        return;
      }
    }
    if(Flag[4]) Datas = ["Black",0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,Flag[4],0];
    else Datas = ["Black",0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,"タイトルに戻る",0];
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
      Datas[8] = DATAS[i].Datas8.replace(/\n/g,"↓").replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/g,Name).replace(/\(一人称\)/g,Person).replace(/\(残りライフ\)/g,Flag[6]);
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
      if(Datas[1]=="主人公カットイン") Datas[1] = Datas[1] = S_image2;
      if(Datas[3]=="主人公カットイン") Datas[3] = Datas[3] = S_image2;
      if(Datas[5]=="主人公カットイン") Datas[5] = Datas[5] = S_image2;
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
    else if (Scene_type=="ライフ判断") {
      if(Flag[6]==0){
        Number = "ライフ0_1";
      }
      else {
        Number = Flag[4];
      }
      Scene_loads2(Number,false,false);
    }
    else if (Scene_type=="移動") {
      Move(DATAS[i].Datas0);
    }
    else if (Scene_type=="尋問") {
      Datas = [DATAS[i].Datas0,DATAS[i].Datas1,DATAS[i].Datas2,DATAS[i].Datas3,DATAS[i].Datas4,DATAS[i].Datas5,DATAS[i].Datas6,DATAS[i].Datas7,DATAS[i].Datas8];
    }
    else if(Scene_type=="アイテムゲット"){
      Scene_type = [DATAS[i].Datas0,DATAS[i].Datas1,DATAS[i].Datas2];
    }
    else{
      Datas[0] = DATAS[i].Datas0;
      Datas[1] = DATAS[i].Datas1;
    }
    if(DATAS[i].get!=false){
      GET = DATAS[i].get.replace(/↓/g,"\n");
      GET = GET.split("\n");
        for (var l = 0; l < GET.length; l++) {
          switch(GET[l]){
            case "フラグリセット":
              Flag_reset();
              continue;
              break;
          case "アイテムリセット":
            Item_Flag = [];
            continue;
            break;
            case "人物リセット":
              Character_Flag = [];
              continue;
              break;
            case "ダメージ":
              Flag[6]--;
              continue;
              break;
            default:
            //console.log(GET[l]);
            break;
          }
          for (var k = 0; k < DATAS.length; k++) {
            if(DATAS[k].Number==GET[l]){
              //console.log(GET[l]);
              break;
            }
          }
          Get_ICF(DATAS[k].type,DATAS[k].Datas0,DATAS[k].Datas1.replace(/\n/g,"↓").replace(/\(一人称\)/g,Person),DATAS[k].Datas2,DATAS[k].Datas3,DATAS[k].Datas4);
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
    }

    function Get_Datas(){
    Get = true;
    Scene_loads2(Flag[4],false,true);
    Get = false;
    return;
    }

    var TitleScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る
      if(window.localStorage.getItem("syoken")!="false"){
        var Data = false;
      }
      else{
        var Data = true;
        BGM_Stop(true);
      }

      var xxx = core.assets["image/title.png"].width;
      var yyy = core.assets["image/title.png"].height;
      var Title = new Sprite(xxx,yyy);
      Title.image = core.assets["image/title.png"];
      Title.scaleX = width/xxx;
      Title.scaleY = width/16*9/yyy;
      Title.x = (Title.scaleX*xxx/2)-xxx/2;
      Title.y = (Title.scaleY*yyy/2)-yyy/2;
      scene.addChild(Title);

      var Numbers = width/16*9;
      var i = 0;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          if(a=="▶ データ初期化") this.x = width-(width/2.5);
          else{
            this.x = 0;
            Numbers += (width/20)+(width/25);
          }
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          i++;
          scene.addChild(this);
        }
      });

      var Text = [];

      Text[i] = new Texts("▶ 最初から");
      if(Data){
        Text[i] = new Texts("▶ データ初期化");
        Text[i] = new Texts("▶ 続きから");
      }
      Text[i] = new Texts("▶ 説明");

      for (var i = 0; i < Text.length; i++){
        Text[i].addEventListener('touchstart',function(e){
          if(Data) Load_Datas();
          if(this.text == "▶ 最初から") Scene_loads("最初から",false,false);
          if(this.text == "▶ 続きから") Scene_loads("セーブ読み込み",false,false);
          if(this.text == "▶ 説明") Scene_loads("説明",false,false);
          if(this.text == "▶ データ初期化"){
            core.pushScene(ClearScene());
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
        });
      }

      Title.addEventListener("enterframe",function(){
        if(core.input.up){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
      })

      var Set_button = new Sprite(195,95);
      Set_button.image = core.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 455;
      Set_button.frame = 15;
      scene.addChild(Set_button);
      Set_button.addEventListener('touchstart',function(e){
        core.pushScene(ReversiScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });

      return scene;
    };
    var MainScene = function(Return){
      var scene = new Scene();                                // 新しいシーンを作る

      var OK = true;
      //console.log(Datas[11]);
      if(Datas[11]!=false){
        if(Datas[11].length>1){
          if(Datas[11].substring(0,2)=="使う") OK = false;
          if(Datas[11].length>2){
            if(Datas[11].substring(0,3)=="調べる") OK = false;
            if(Datas[11].substring(0,3)=="ヒント") OK = false;
            if(Datas[11].length>4){
              if(Datas[11].substring(0,5)=="つきつける") OK = false;
            }
          }
        }
        if(OK) Flag[4] = Datas[11];
        if(Flag[8]){
          Save(Datas[11]);
        }
      }

      if(Datas[0]=="ヒント"){
        var xxx = core.assets["image/融合.png"].width;
        var yyy = core.assets["image/融合.png"].height;
        var Background = new Sprite(xxx,yyy);
        Background.image = core.assets["image/融合.png"];
        Background.scaleX = width/xxx*1.2;
        Background.scaleY = width/yyy*1.2;
        Background.x = (width-xxx)/2;
        Background.y = -(width-xxx)/2;
        Rotation_Y -= 10;
        Background.rotation = Rotation_Y;
        scene.addChild(Background);//背景
        Background.addEventListener("enterframe",function(){
          Rotation_Y -= 10;
          Background.rotation = Rotation_Y;
          if(Rotation_Y==-360) Rotation_Y = 0;
        })
      }
      else{
        var xxx = core.assets["image/背景/"+ Datas[0] +".png"].width;
        var yyy = core.assets["image/背景/"+ Datas[0] +".png"].height;
        var Background = new Sprite(xxx,yyy);
        Background.scaleX = width/xxx;
        Background.scaleY = width/16*9/yyy;
        Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
        Background.x = (Background.scaleX*xxx/2)-xxx/2;
        Background.y = (Background.scaleY*yyy/2)-yyy/2;
        scene.addChild(Background);//背景
      }

      if(Datas[0]=="カットイン"){
        var ccx = core.assets["image/背景/"+ Datas[0] +".png"].width*3;
        var ccy = core.assets["image/背景/"+ Datas[0] +".png"].height;
        var Cut_in = new Sprite(ccx,ccy);
        Cut_in.scaleX = width/ccx*3;
        Cut_in.scaleY = width/16*9/ccy;
        Cut_in.image = core.assets["image/"+ Datas[0] +".png"];
        Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2;
        Cut_in.y = (Cut_in.scaleY*ccy/2)-ccy/2;
        scene.addChild(Cut_in);//背景
        var Cut_in_time = 0;
        Cut_in.addEventListener("enterframe",function(){
          Cut_in_time += 10;
          Cut_in.x -= 10;
          if(Cut_in_time>width*2){
            Cut_in_time = 0;
            Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2;
          }
        })
      }

      if(Datas[3]!=false){
        var xxx = core.assets["image/人物/"+Datas[3]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[3]+".png"].height;
        var Character2 = new Sprite(xxx,yyy);
        Character2.scaleX = ((width/2)/xxx);
        Character2.scaleY = (((width/16)*9)/yyy);
        Character2.image = core.assets["image/人物/"+Datas[3]+".png"];
        Character2.x = (Character2.scaleX*xxx/2)-xxx/2+(width/4);
        Character2.y = (Character2.scaleX*yyy/2)-yyy/2;
        if(Datas[4]!=0){
          if(Datas[4]>0){
            if(Return!=true){
              Character2.opacity = 0;
              Character2.tl.fadeIn(Datas[4]);
            }
          }
          else{
            if(Return!=true){
              Character2.tl.fadeOut(Datas[4]*-1);
            }
            else Character2.opacity = 0;
          }
        }
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "留置所":
          var xxx = core.assets["image/"+ Datas[0] +".png"].width;
          var yyy = core.assets["image/"+ Datas[0] +".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = core.assets["image/"+ Datas[0] +".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var xxx = core.assets["image/人物/"+Datas[1]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[1]+".png"].height;
        var Character1 = new Sprite(xxx,yyy);
        Character1.scaleX = ((width/2)/xxx);
        Character1.scaleY = (((width/16)*9)/yyy);
        Character1.image = core.assets["image/人物/"+Datas[1]+".png"];
        Character1.x = (Character1.scaleX*xxx/2)-xxx/2;
        Character1.y = (Character1.scaleX*yyy/2)-yyy/2;
        if(Datas[2]!=0){
          if(Datas[2]>0){
            if(Return!=true){
              Character1.opacity = 0;
              Character1.tl.fadeIn(Datas[2]);
            }
          }
          else{
            if(Return!=true){
              Character1.tl.fadeOut(Datas[2]*-1);
            }
            else Character1.opacity = 0;
          }
        }
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[5]!=false){
        var xxx = core.assets["image/人物/"+Datas[5]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[5]+".png"].height;
        var Character3 = new Sprite(xxx,yyy);
        Character3.scaleX = ((width/2)/xxx);
        Character3.scaleY = (((width/16)*9)/yyy);
        Character3.image = core.assets["image/人物/"+Datas[5]+".png"];
        Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/2);
        Character3.y = (Character3.scaleX*yyy/2)-yyy/2;
        if(Datas[6]!=0){
          if(Datas[6]>0){
            if(Return!=true){
              Character3.opacity = 0;
              Character3.tl.fadeIn(Datas[6]);
            }
          }
          else{
            if(Return!=true){
              Character3.tl.fadeOut(Datas[6]*-1);
            }
            else Character3.opacity = 0;
          }
        }
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var xxx = core.assets["image/"+ Datas[0] +".png"].width;
          var yyy = core.assets["image/"+ Datas[0] +".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = core.assets["image/"+ Datas[0] +".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }
      //  Datas = [1,S_image,0,0,0,4,0,T_Name,Text,Rewind,Before,Number,After,Skip];

      if(Datas[14]!=undefined&&Datas[14]!=false){
        var xxx = core.assets["image/正方形/"+Datas[15]+".png"].width;
        var yyy = core.assets["image/正方形/"+Datas[15]+".png"].height;
        var Item = new Sprite(xxx,yyy);
        Item.scaleX = ((width/4)/xxx);
        Item.scaleY = ((width/4)/yyy);
        Item.image = core.assets["image/正方形/"+Datas[15]+".png"];
        Item.x = ((Item.scaleX*xxx/2)-xxx/2)+Datas[14].substring(0,4)*(width/1600);
        Item.y = ((Item.scaleY*yyy/2)-yyy/2)+Datas[14].substring(5,9)*(width/16/100);
        if(Return!=true&&Datas[14].substring(11,12)*1!=0){
          Sound_ON("Choice",true);
          Item.opacity = 0;
          Item.tl.fadeIn(Datas[14].substring(11,12)*1);
        }
        scene.addChild(Item);
      }//アイテム

      var Background2 = new Sprite(width,height);
      Background2.image = core.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = (width/16)*9;
      scene.addChild(Background2);//白地

      if(Datas[7]!=""){
        var C_name = new Label();
        C_name.font  = (width/20)+"px monospace";
        C_name.color = 'black';
        C_name.x = 0;
        C_name.y = width/16*9+(width/25);
        C_name.width = width;
        C_name.height = (width/20);
        C_name.text = "【" + Datas[7] + "】";
        scene.addChild(C_name);//キャラ名
      }

      var Numbers = width/16*9+(width/20)+(width/25);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Numbers += (width/20)+(width/25);
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/50);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          scene.addChild(this);
        }
      });

      var Text =[];

      for (var i = 0; i <6; i++) {
        Text[i] = new Texts("");
      }

      var Time = 0;
      var Time2 = 0;
      var k = 0;
      var Text_defined = true;

      function T_D(){
        var s = true;
        if(Datas[8].substring(Time,Time+1)=="→"){
          s = false;
        }
        Time ++;
        if(s){
          Time2 ++;
          if(Time2==19){
            k++;
            Time2 = 0;
            if(Datas[8].substring(0,1)=="("){
              Text[k].text = " ";
              Time2 ++;
            }
            if(Datas[8].substring(0,1)=="「"){
              if(Datas[8].substring(Time-2,Time-1)!="」"){
                Text[k].text = "　";
                Time2 ++;
              }
            }
          }
          if(Datas[8].substring(Time-1,Time)=="↓"||Time2==19){
            if(Time2>1) k++;
            Time2 = 0;
            if(Datas[8].substring(0,1)=="("){
              Text[k].color = "blue";
              Text[k].text = " ";
              Time2 ++;
            }
            if(Datas[8].substring(0,1)=="("){
              Text[k].text = " ";
              Time2 ++;
            }
            if(Datas[8].substring(0,1)=="「"){
              if(Datas[8].substring(Time-2,Time-1)!="」"){
                Text[k].text = "　";
                Time2 ++;
              }
            }
          }
          else if(Datas[8].substring(Time-1,Time)!=""){
            if(Text[k].text.substring(0,1)=="("||Text[k].text.substring(0,1)==" ") Text[k].color = "blue";
            Text[k].text = Text[k].text+Datas[8].substring(Time-1,Time);
          }
          else if(Datas[8].substring(Time-1,Time)==""){
            Text_defined = false;
          }
        }
      }

      Background2.addEventListener("enterframe",function(){
        if(Return!=true&&Text_defined){
          T_D();
        }
      })

      if(Return){
          for (var i = 0; i < Datas[8].length+1; i++) {
            T_D();
          }
        }

      if(Datas[9]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return1 = new Sprite(xxx,yyy);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.scaleX = ((width/5)/xxx);
        Return1.scaleY = (((width/5))/yyy);//ココが変換した場所
        Return1.x = (Return1.scaleX*xxx/2)-xxx/2;
        Return1.y = (Return1.scaleY*yyy/2)-yyy/2+height-Return1.scaleY*yyy;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[9],true,false);
        });
      } //戻る1

      if(Datas[10]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return2 = new Sprite(xxx,yyy);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.scaleX = ((width/5)/xxx);
        Return2.scaleY = (((width/5))/yyy);//ココが変換した場所
        Return2.x = (Return2.scaleX*xxx/2)-xxx/2+(width/5)*1;
        Return2.y = (Return2.scaleY*yyy/2)-yyy/2+height-Return2.scaleY*yyy;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[10],true,false);
        });
      }//戻る2

      if(Datas[11]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Settings = new Sprite(xxx,yyy);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.scaleX = ((width/5)/xxx);
        Settings.scaleY = (((width/5))/yyy);//ココが変換した場所
        Settings.x = (Settings.scaleX*xxx/2)-xxx/2+(width/5)*2;
        Settings.y = (Settings.scaleY*yyy/2)-yyy/2+height-Settings.scaleY*yyy;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[11],false));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        });
      }//アイテム画面

      if(Datas[12]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Enter1 = new Sprite(xxx,yyy);
        Enter1.image = core.assets["image/Buttons.png"];
        Enter1.scaleX = ((width/5)/xxx);
        Enter1.scaleY = (((width/5))/yyy);//ココが変換した場所
        Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
        Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
        Enter1.frame = 5;
        scene.addChild(Enter1);
        Enter1.addEventListener('touchstart',function(e){
          if(Text_defined){
            Text_defined = false;
            for (var i = 0; i <6; i++) {
              Text[i].text = "";
            }
            Time = 0;
            Time2 = 0;
            k = 0;
            for (var i = 0; i < Datas[8].length+1; i++) {
              T_D();
            }
          }
          else Scene_loads(Datas[12],false,false);
        });
      }//進む1

      if(Datas[13]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Enter2 = new Sprite(xxx,yyy);
        Enter2.image = core.assets["image/Buttons.png"];
        Enter2.scaleX = ((width/5)/xxx);
        Enter2.scaleY = (((width/5))/yyy);//ココが変換した場所
        Enter2.x = (Enter2.scaleX*xxx/2)-xxx/2+(width/5)*4;
        Enter2.y = (Enter2.scaleY*yyy/2)-yyy/2+height-Enter2.scaleY*yyy;
        Enter2.frame = 6;
        scene.addChild(Enter2);
        Enter2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],false,false);
        });//進む2
      }

      if(Datas[16]!=undefined){
        if(window.localStorage.getItem(Datas[16])==undefined){
          if(Datas[11]>0) window.localStorage.setItem(Datas[16],"獲得！");
          var Time = 0;
          var xxx = core.assets["image/Trophies.png"].width;
          var yyy = core.assets["image/Trophies.png"].height;
          var Trophies = new Sprite(xxx,yyy);
          Trophies.image = core.assets["image/Trophies.png"];
          Trophies.scaleX = ((width/3.61)/xxx);
          Trophies.scaleY = (((width/14.15))/yyy);//ココが変換した場所
          Trophies.x = (Trophies.scaleX*xxx/2)-xxx/2+(width-(width/3.5));
          Trophies.y = (Trophies.scaleY*yyy/2)-yyy/2+(width/80);
          Trophies.opacity = 0;
          Trophies.tl.fadeIn(50);
          scene.addChild(Trophies);
          var xxx = core.assets["image/正方形/"+Datas[17]+".png"].width;
          var yyy = core.assets["image/正方形/"+Datas[17]+".png"].height;
          var Trophies_image = new Sprite(xxx,yyy);
          Trophies_image.image = core.assets["image/正方形/"+Datas[17]+".png"];
          Trophies_image.scaleX = ((width/18.82)/xxx);
          Trophies_image.scaleY = ((width/18.82)/yyy);
          Trophies_image.x = (Trophies_image.scaleX*xxx/2)-xxx/2+(width-(width/3.6));
          Trophies_image.y = (Trophies_image.scaleY*yyy/2)-yyy/2+(width/50);
          Trophies_image.opacity = 0;
          Trophies_image.tl.fadeIn(50);
          scene.addChild(Trophies_image);
          var Trophies_text = new Label();
          Trophies_text.font  = (width/40)+"px monospace";
          Trophies_text.color = 'white';
          Trophies_text.x = (width-(width/5));
          Trophies_text.y = (width/28)+(width/80);
          Trophies_text.width = width;
          Trophies_text.height = (width/40);
          Trophies_text.opacity = 0;
          Trophies_text.tl.fadeIn(50);
          Trophies_text.text = Datas[16];
          scene.addChild(Trophies_text);
          Sound_ON("Trophies",true);
          Trophies.addEventListener("enterframe",function(){
            Time++;
            if(Time==200){
              Trophies.tl.fadeOut(50);
              Trophies_image.tl.fadeOut(50);
              Trophies_text.tl.fadeOut(50);
            }
          })
        }
      }//トロフィー*/
      return scene;
    };
    var MoveScene = function(Out){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/背景/Black.png"].width;
      var yyy = core.assets["image/背景/Black.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = core.assets["image/背景/Black.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      if(Out!=0){
        if(Out>0){
            Background.opacity = 0;
            Background.tl.fadeIn(Out);
        }
        else{
            Background.tl.fadeOut(Out*-1);
        }
      }
      scene.addChild(Background);//背景

      var Background2 = new Sprite(width,height);
      Background2.image = core.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = (width/16)*9;
      scene.addChild(Background2);//白地

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Enter1 = new Sprite(xxx,yyy);
      Enter1.image = core.assets["image/Buttons.png"];
      Enter1.scaleX = ((width/5)/xxx);
      Enter1.scaleY = (((width/5))/yyy);//ココが変換した場所
      Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
      Enter1.frame = 5;
      scene.addChild(Enter1);

      Enter1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Scene_loads(Moves,false,false);
      });

      Background.addEventListener("enterframe",function(){
        if(Background.opacity == 1 && Out>0){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(Moves,false,false);
          core.pushScene(MoveScene(-10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        if(Background.opacity == 0 && Out<0){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
      })

      return scene;
    };
    var ChoiceScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var OK = true;
      //console.log(Datas[6]);
      if(Datas[6]!=false){
        if(Datas[6].length>1){
          if(Datas[6].substring(0,2)=="使う") OK = false;
          if(Datas[6].length>2){
            if(Datas[6].substring(0,3)=="調べる") OK = false;
            if(Datas[6].substring(0,3)=="ヒント") OK = false;
            if(Datas[6].length>4){
              if(Datas[6].substring(0,5)=="つきつける") OK = false;
            }
          }
        }
        if(OK) Flag[4] = Datas[6];
        if(Flag[8]&&Datas[6]!="ゲームオーバー"){
          Save(Datas[6]);
        }
      }

      if(Datas[0]=="ヒント"){
        var xxx = core.assets["image/融合.png"].width;
        var yyy = core.assets["image/融合.png"].height;
        var Background = new Sprite(xxx,yyy);
        Background.image = core.assets["image/融合.png"];
        Background.scaleX = width/xxx*1.2;
        Background.scaleY = width/yyy*1.2;
        Background.x = (width-xxx)/2;
        Background.y = -(width-xxx)/2;
        Rotation_Y -= 10;
        Background.rotation = Rotation_Y;
        scene.addChild(Background);//背景
        var Background2 = new Sprite(width,height);
        Background2.image = core.assets["image/white.png"];
        Background2.x = 0;
        Background2.y = (width/16)*9;
        scene.addChild(Background2);//白地
        Background.addEventListener("enterframe",function(){
          Rotation_Y -= 10;
          Background.rotation = Rotation_Y;
          if(Rotation_Y==-360) Rotation_Y = 0;
        })
      }
      else{
        var xxx = core.assets["image/背景/"+ Datas[0] +".png"].width;
        var yyy = core.assets["image/背景/"+ Datas[0] +".png"].height;
        var Background = new Sprite(xxx,yyy);
        Background.scaleX = ((width)/xxx);
        Background.scaleY = (((width/16)*9)/yyy);
        Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
        Background.x = (Background.scaleX*xxx/2)-xxx/2;
        Background.y = (Background.scaleY*yyy/2)-yyy/2;
        scene.addChild(Background);
      }

      if(Datas[2]!=false){
        var xxx = core.assets["image/人物/"+Datas[2]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[2]+".png"].height;
        var Character2 = new Sprite(xxx,yyy);
        Character2.scaleX = ((width/2)/xxx);
        Character2.scaleY = (((width/16)*9)/yyy);
        Character2.image = core.assets["image/人物/"+Datas[2]+".png"];
        Character2.x = (Character2.scaleX*xxx/2)-xxx/2+(width/4);
        Character2.y = (Character2.scaleX*yyy/2)-yyy/2;
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "留置所":
          var xxx = core.assets["image/"+ Datas[0] +".png"].width;
          var yyy = core.assets["image/"+ Datas[0] +".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = core.assets["image/"+ Datas[0] +".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var xxx = core.assets["image/人物/"+Datas[1]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[1]+".png"].height;
        var Character1 = new Sprite(xxx,yyy);
        Character1.scaleX = ((width/2)/xxx);
        Character1.scaleY = (((width/16)*9)/yyy);
        Character1.image = core.assets["image/人物/"+Datas[1]+".png"];
        Character1.x = (Character1.scaleX*xxx/2)-xxx/2;
        Character1.y = (Character1.scaleX*yyy/2)-yyy/2;
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var xxx = core.assets["image/人物/"+Datas[3]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[3]+".png"].height;
        var Character3 = new Sprite(xxx,yyy);
        Character3.scaleX = ((width/2)/xxx);
        Character3.scaleY = (((width/16)*9)/yyy);
        Character3.image = core.assets["image/人物/"+Datas[3]+".png"];
        Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/2);
        Character3.y = (Character3.scaleX*yyy/2)-yyy/2;
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var xxx = core.assets["image/"+ Datas[0] +".png"].width;
          var yyy = core.assets["image/"+ Datas[0] +".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = core.assets["image/"+ Datas[0] +".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      var Numbers = width/16*9+(width/20);

      var Texts = Class.create(Label, {
        initialize: function(a,b) {
          if(a==false||a==undefined||a==0) return;
          Numbers += (width/20)+(width/25);
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = 0;
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = "▶ " + a;
          scene.addChild(this);
          if(have(a)){
            this.text += " ✓";
            this.color = "red";
          }
          this.addEventListener('touchstart',function(e){
            if(this.text == "▶ 調べる") Inspect_loads(Datas[6],false);
            else if (this.text == "▶ つきつける"){
              core.pushScene(ItemScene(Datas[6],"日常"));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
            }
            else Scene_loads(b,false,false);
          });
        }
      });

      var Text = [];
        //console.log(Datas);
        for (var i = 7; i < Datas.length; i = i+2) {
          Text = new Texts(Datas[i],Datas[i+1]);
        }

      if(Datas[4]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return1 = new Sprite(xxx,yyy);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.scaleX = ((width/5)/xxx);
        Return1.scaleY = (((width/5))/yyy);//ココが変換した場所
        Return1.x = (Return1.scaleX*xxx/2)-xxx/2;
        Return1.y = (Return1.scaleY*yyy/2)-yyy/2+height-Return1.scaleY*yyy;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[4],true,false);
        });
      } //戻る1

      if(Datas[5]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return2 = new Sprite(xxx,yyy);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.scaleX = ((width/5)/xxx);
        Return2.scaleY = (((width/5))/yyy);//ココが変換した場所
        Return2.x = (Return2.scaleX*xxx/2)-xxx/2+(width/5)*1;
        Return2.y = (Return2.scaleY*yyy/2)-yyy/2+height-Return2.scaleY*yyy;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[5],true,false);
        });
      }//戻る2

      if(Datas[6]!=false&&Datas[6]!="ゲームオーバー"){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Settings = new Sprite(xxx,yyy);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.scaleX = ((width/5)/xxx);
        Settings.scaleY = (((width/5))/yyy);//ココが変換した場所
        Settings.x = (Settings.scaleX*xxx/2)-xxx/2+(width/5)*2;
        Settings.y = (Settings.scaleY*yyy/2)-yyy/2+height-Settings.scaleY*yyy;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[6],false));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        });
      }
      return scene;
    };
    var PopScene = function(Number,Type){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/"+Type+".png"].width;
      var yyy = core.assets["image/"+Type+".png"].height;
      var Pop = new Sprite(xxx,yyy);
      Pop.image = core.assets["image/"+Type+".png"];
      Pop.scaleX = width/xxx;
      Pop.scaleY = width/16*9/yyy;
      Pop.x = (Pop.scaleX*xxx/2)-xxx/2;
      Pop.y = (Pop.scaleY*yyy/2)-yyy/2;
      scene.addChild(Pop);
      Sound_ON(Type,true);

      var Time = 0;

      Pop.addEventListener("enterframe",function(){
        Time++;
        switch (Time) {
          case 2:
            Pop.x = ((Pop.scaleX*xxx/2)-xxx/2)+10;
            Pop.y = ((Pop.scaleY*yyy/2)-yyy/2)+10;
            break;
          case 3:
            Pop.x = ((Pop.scaleX*xxx/2)-xxx/2)-20;
            Pop.y = ((Pop.scaleY*yyy/2)-yyy/2)-30;
            break;
          case 4:
            Pop.x = ((Pop.scaleX*xxx/2)-xxx/2)+30;
            Pop.y = ((Pop.scaleY*yyy/2)-yyy/2)+20;
            break;
          case 15:
            core.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Scene_loads(Number,false,false);
            break;
          default:
            Pop.x = ((Pop.scaleX*xxx/2)-xxx/2);
            Pop.y = ((Pop.scaleY*yyy/2)-yyy/2);
            break;
        }
      })

      return scene;
    };
    var InterrogationScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Flag[8]&&Datas[5]!=false){
        Save(Datas[5]);
      }

      Flag[4] = Datas[5];

      var xxx = core.assets["image/背景/stand.png"].width;
      var yyy = core.assets["image/背景/stand.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = core.assets["image/背景/stand.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);//証言席

      var xxx = core.assets["image/人物/"+Datas[0]+".png"].width;
      var yyy = core.assets["image/人物/"+Datas[0]+".png"].height;
      var Character = new Sprite(xxx,yyy);
      Character.scaleX = ((width/2)/xxx);
      Character.scaleY = (((width/16)*9)/yyy);
      Character.image = core.assets["image/人物/"+Datas[0]+".png"];
      Character.x = (Character.scaleX*xxx/2)-xxx/2+(width/4);
      Character.y = (Character.scaleX*yyy/2)-yyy/2;
      scene.addChild(Character);//キャラ

      var xxx = core.assets["image/stand.png"].width;
      var yyy = core.assets["image/stand.png"].height;
      var Stand = new Sprite(xxx,yyy);
      Stand.scaleX = width/xxx;
      Stand.scaleY = width/16*9/yyy;
      Stand.image = core.assets["image/stand.png"];
      Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
      Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
      scene.addChild(Stand);//証言台

      var C_name = new Label();
      C_name.font  = (width/20)+"px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = width/16*9+(width/25);
      C_name.width = width;
      C_name.height = (width/20);
      C_name.text = "【" + Datas[1] + "】";
      scene.addChild(C_name);//キャラ名

      var Numbers = width/16*9+(width/20)+(width/25);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Numbers += (width/20)+(width/25);
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'purple';
          this.x = (width/50);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          scene.addChild(this);
        }
      });

      var Text = Datas[2].split("↓");

      for (var i = 0; i < Text.length; i++) {
        if(Text[i].length>18){
          if(Text[i+1]==undefined) Text[i+1] = Text[i].substring(18);
          else Text[i+1] = Text[i].substring(18) + Text[i+1]+"";
          Text[i] = Text[i].substring(0,18);
        }
        Text[i] = new Texts(Text[i]);
      }

      if(Text[0].text.substring(0,1)=="「"&&Text[i-1].text.substring(Text[i-1].text.length-1)=="」"){
        for (var i = 1; i < Text.length; i++) {
          Text[i].text = "　" + Text[i].text;
        }
      }

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button1 = new Sprite(xxx,yyy);
      Button1.image = core.assets["image/Buttons.png"];
      Button1.scaleX = ((width/5)/xxx);
      Button1.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button1.x = (Button1.scaleX*xxx/2)-xxx/2;
      Button1.y = (Button1.scaleY*yyy/2)-yyy/2+height-Button1.scaleY*yyy;
      Button1.frame = 0;
      scene.addChild(Button1);
      Button1.addEventListener('touchstart',function(e){
        core.pushScene(PopScene(Datas[3],"待った！"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//ゆさぶる

      if(Datas[4]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Button2 = new Sprite(xxx,yyy);
        Button2.image = core.assets["image/Buttons.png"];
        Button2.scaleX = ((width/5)/xxx);
        Button2.scaleY = (((width/5))/yyy);//ココが変換した場所
        Button2.x = (Button2.scaleX*xxx/2)-xxx/2+(width/5);
        Button2.y = (Button2.scaleY*yyy/2)-yyy/2+height-Button2.scaleY*yyy;
        Button2.frame = 2;
        scene.addChild(Button2);
        Button2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[4],true,false);
        });
      }//戻る

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button3 = new Sprite(xxx,yyy);
      Button3.image = core.assets["image/Buttons.png"];
      Button3.scaleX = ((width/5)/xxx);
      Button3.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button3.x = (Button3.scaleX*xxx/2)-xxx/2+(width/5)*2;
      Button3.y = (Button3.scaleY*yyy/2)-yyy/2+height-Button3.scaleY*yyy;
      Button3.frame = 3;
      scene.addChild(Button3);
      Button3.addEventListener('touchstart',function(e){
        core.pushScene(SettingScene(Datas[5]));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//設定

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button4 = new Sprite(xxx,yyy);
      Button4.image = core.assets["image/Buttons.png"];
      Button4.scaleX = ((width/5)/xxx);
      Button4.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button4.x = (Button4.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Button4.y = (Button4.scaleY*yyy/2)-yyy/2+height-Button4.scaleY*yyy;
      Button4.frame = 5;
      scene.addChild(Button4);
      Button4.addEventListener('touchstart',function(e){
        Scene_loads(Datas[6],false,false);
      });//進む

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button5 = new Sprite(xxx,yyy);
      Button5.image = core.assets["image/Buttons.png"];
      Button5.scaleX = ((width/5)/xxx);
      Button5.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button5.x = (Button5.scaleX*xxx/2)-xxx/2+(width/5)*4;
      Button5.y = (Button5.scaleY*yyy/2)-yyy/2+height-Button5.scaleY*yyy;
      Button5.frame = 7;
      scene.addChild(Button5);
      Button5.addEventListener('touchstart',function(e){
        core.pushScene(ItemScene(Datas[7],Datas[8]));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//つきつける

      return scene;
    };
    var SettingScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = (width/20);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          Numbers += (width/20)+(width/25);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/15);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          i++;
          scene.addChild(this);
        }
      });

      var Text = [];

      Text[0] = new Texts("▶ 設定を閉じる");
      Text[1] = new Texts("▶ タイトルに戻る");
      Text[2] = new Texts("▶ サウンド設定");
      Text[3] = new Texts("▶ セーブデータ読み込み");
      Text[4] = new Texts("▶ セーブ方法の切り替え");
      if(Flag[8]) Text[5] = new Texts("現在はオートセーブです。");
      else Text[5] = new Texts("▶ セーブする");
      Text[6] = new Texts("");
      Text[7] = new Texts("性別");
      Text[8] = new Texts("苗字");
      Text[9] = new Texts("名前");
      Text[10] = new Texts("▶ 設定する");
      Text[11] = new Texts("");

      var Man = new Label();
      Man.font  = (width/20)+"px monospace";
      Man.color = 'black';
      Man.x = (width/5);
      Man.y = Text[7].y;
      Man.text = "男";
      scene.addChild(Man);

      var Woman = new Label();
      Woman.font  = (width/20)+"px monospace";
      Woman.color = 'black';
      Woman.x = (width/5)+(width/5);
      Woman.y = Text[7].y;
      Woman.text = "女";
      scene.addChild(Woman);

      var S_Input = new Entity();
      S_Input.moveTo((width/5),Text[8].y);
      S_Input.width = 190;
      S_Input.height = (width/20);
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = Flag[1];
      S_Input._element.placeholder = "苗字を入力";
      scene.addChild(S_Input);

      var S_Input2 = new Entity();
      S_Input2.moveTo((width/5),Text[9].y);
      S_Input2.width = 190;
      S_Input2.height = (width/20);
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = Flag[0];
      S_Input2._element.placeholder = "名前を入力";
      scene.addChild(S_Input2);

      var xxx = core.assets["image/Round.png"].width;
      var yyy = core.assets["image/Round.png"].height;
      var Round = new Sprite(xxx,yyy);
      Round.scaleX = ((width/20)/xxx);
      Round.scaleY = ((width/20)/yyy);
      Round.image = core.assets["image/Round.png"];
      if(Flag[2]=="男"){
        Round.x = Man.x+(Round.scaleX*xxx/2)-xxx/2;
        Round.y = Man.y+(Round.scaleY*yyy/2)-yyy/2;
      }
      else{
        Round.x = Woman.x+(Round.scaleX*xxx/2)-xxx/2;
        Round.y = Woman.y+(Round.scaleY*yyy/2)-yyy/2;
      }
      scene.addChild(Round);

      for (var i = 0; i < Text.length; i++) {
        Text[i].addEventListener('touchstart',function(e){
          switch (this.text.substring(2)){
            case "設定を閉じる":
            core.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
            case "タイトルに戻る":
            core.popScene();
            core.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Scene_loads("タイトルに戻る",false,false,false);
            break;
            case "サウンド設定":
            core.pushScene(SoundScene());
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            break;
            case "セーブする":
              Save(Number);
              Sound_ON("Item",true);
              Text[6].text = "セーブしました。";
              break;
              case "セーブ方法の切り替え":
              if(Flag[8]){
                Flag[8] = false;
                Text[5].text = "▶ セーブする";
              }
              else{
                Flag[8] = true;
                Text[5].text = "現在はオートセーブです。";
                Text[6].text = "";
              }
              break;
              case "セーブデータ読み込み":
              core.popScene();
              core.popScene();
              Scene_kazu--;
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              Scene_loads("セーブ読み込み",false,false);
              break;
              case "設定する":
              Flag[0] = S_Input2._element.value;
              Flag[1] = S_Input._element.value;
              if(Round.x == Man.x+(Round.scaleX*xxx/2)-xxx/2){
                Flag[2] = "男";
                if(S_Input._element.value=="") Flag[1] = "若辻";
                if(S_Input2._element.value=="") Flag[0] = "俛人";
              }
              else{
                Flag[2] = "女";
                if(S_Input._element.value=="") Flag[1] = "防人";
                if(S_Input2._element.value=="") Flag[0] = "玲奈";
              }
              if(S_Input2._element.value=="チート移動"){
                core.popScene();
                core.popScene();
                Scene_kazu--;
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                Number = S_Input._element.value;
                if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1
                Scene_loads(Number,false,false);
                return;
              }
              else if(S_Input2._element.value=="チートアイテム"){
                Item_Flag[Item_Flag.length] = S_Input._element.value.split(",");
                if(Item_Flag[Item_Flag.length-1].length==2){
                  Item_Flag[Item_Flag.length-1][2] = 27;
                }
                if(Item_Flag[Item_Flag.length-1].length==1){
                  Item_Flag[Item_Flag.length-1][1] = "チートで生み出したアイテム。↓見た目は強欲な壺。";
                  Item_Flag[Item_Flag.length-1][2] = 27;
                }
                Sound_ON("Item",true);
                Text[11].text = "アイテムゲット "+Item_Flag[Item_Flag.length-1][0];
                return;
              }
              else if(S_Input2._element.value=="チート体力"){
                Flag[6] = S_Input._element.value*1;
                Sound_ON("Item",true);
                Text[11].text = "残り回数 = "+S_Input._element.value;
                return;
              }
              else if(S_Input2._element.value=="チートフラグ"){
                for (var i = 10; i < Flag.length; i++){
                  if(Flag[i]==S_Input._element.value){
                    Flag[i] = false;
                    Text[11].text = S_Input._element.value+" 消去";
                    return;
                  }
                }
                Flag[Flag.length] = S_Input._element.value;
                Sound_ON("Item",true);
                Text[11].text = S_Input._element.value;
                return;
              }
              Sound_ON("Item",true);
              Text[11].text = "設定しました。";
              break;
          }
        });
      }

      Man.addEventListener('touchstart',function(e){
        Round.x = Man.x+(Round.scaleX*xxx/2)-xxx/2;
        Round.y = Man.y+(Round.scaleY*yyy/2)-yyy/2;
        return;
      });

      Woman.addEventListener('touchstart',function(e){
        Round.x = Woman.x+(Round.scaleX*xxx/2)-xxx/2;
        Round.y = Woman.y+(Round.scaleY*yyy/2)-yyy/2;
        return;
      });

      /*
      Text13.addEventListener('touchstart',function(e){
        core.pushScene(TrophiesScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
      });*/

      return scene;
    };
    var TrophiesScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(width,height);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (width/20)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (width/20);
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (width/20)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/8);
      Text2.y = 1100;
      Text2.width = 1200;
      Text2.height = 180;
      Text2.text = "";
      scene.addChild(Text2);

      var Numbers = 300;

      var Texts = Class.create(Label, {
        initialize: function(a,b,c) {
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = "未獲得";
          this.syousai = b;
          if(window.localStorage.getItem(a)=="獲得！"){
            this.text = a;
            this.syousai = c;
          }
          Numbers += 100;
          scene.addChild(this);
        }
      });

      var Text = [];
      Text[0] = new Texts("即決！","すぐさまフレンズを結成しよう。","実際にこれぐらいの勢いがあれば友達もっといるんだろうなぁ。あ、みおちゃんの話だよ。");
      Text[1] = new Texts("カレン強奪事件","復習は大事","ラブミーティアの結成秘話。実際には噂が一人歩きしたものである。そういう意味では神話というのは正しいのかもしれない。ちなみに、カレンさんもこの話がお気に入りである。");
      Text[2] = new Texts("犯行の手口","実際にやるなよ。","あいねちゃんを監視するための手段。実際にはリフレクトムーンの目撃情報の集計である。ネットリテラシーの欠片もない。");
      Text[3] = new Texts("電話","そんなこと電話で済ますか…？","夜分遅くに電話かけるのはよくないよ。あいねちゃんだから許してくれるけど。");
      Text[4] = new Texts("やっぱり必要だった","命は預けた。","アイカツカードはちゃんと持っとかないと。");
      Text[5] = new Texts("気高さ刻み込め","プライドを布教しよう。","ちなみに渡そうと思えば何回でも渡せる。");

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      for (var i = 0; i < Text.length; i++){
        Text[i].addEventListener('touchstart',function(e){
          if(this.color=="black"){
            this.text = "▶ " + this.text;
            this.color = "red";
            Text2.text = this.syousai;
          }
          else{
            this.text = this.text.substring(2);
            this.color = "black";
            Text2.text = "";
          }
          for (var k = 0; k < Text.length; k++){
            if(Text[k].color=="red"&&this!=Text[k]){
              Text[k].text = Text[k].text.substring(2);
              Text[k].color = "black";
            }
          }
          return;
        });
      }

      return scene;
    };
    var InspectScene = function(Inspect,Item){
      var scene = new Scene();                                // 新しいシーンを作る


    var xxx = core.assets["image/背景/"+ Datas[0] +".png"].width;
    var yyy = core.assets["image/背景/"+ Datas[0] +".png"].height;
    var Background = new Sprite(xxx,yyy);
    Background.scaleX = width/xxx;
    Background.scaleY = width/16*9/yyy;
    Background.image = core.assets["image/背景/"+ Inspect[0] +".png"];
    Background.x = (Background.scaleX*xxx/2)-xxx/2;
    Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);
      Background.addEventListener('touchstart',function(e){
        if(Inspect=="Black") Scene_loads("調べる出来てない",false,Item);
        else Scene_loads("調べる何もない",false,Item);
      });

      var Touchs = Class.create(Sprite, {
        initialize: function(x,y,width1,height1,Number){
          Sprite.call(this,width1*Background.scaleX,height1*Background.scaleY);
          this.x = x*Background.scaleX;
          this.y = y*Background.scaleY;
          this.image = core.assets["image/背景/透明.png"];
          scene.addChild(this);
          this.addEventListener('touchstart',function(e){
            Scene_loads(Number,false,Item);
            return;
          });
        }
      });

      var Touch = [];
      var k = 0;

      for (var i = 1; i < Inspect.length; i = i+5) {
        Touch[k] = new Touchs(Inspect[i],Inspect[i+1],Inspect[i+2],Inspect[i+3],Inspect[i+4]);
        k++;
      }

      var Text = new Label();
      Text.font  = (width/20)+"px monospace";
      Text.color = 'black';
      Text.x = 0;
      Text.y = (width/16*9)+(width/20)*1;
      Text.width = width;
      Text.height = (width/20);
      Text.text = "▶ 戻る";
      scene.addChild(Text);
      Text.addEventListener('touchstart',function(e){
        if(Flag[4].length>5){
          if(Flag[4].substring(0,6)=="アイテム使用"){
            Flag[4] = Flag[4].substring(6).split(",");
            Flag[4] = Flag[4][1];
            if(Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Flag[4] = Flag[4]*1;
          }
        }
        Scene_loads(Flag[4],true,Item);
      });

      return scene;
    };
    var ItemgetScene = function(a,b,c){
      var scene = new Scene();                                // 新しいシーンを作る

      BGM_Stop(true);

      var Background = new Sprite(width,height-(width/16)*9);
      Background.image = core.assets["image/white.png"];
      Background.x = 0;
      Background.y = (width/16)*9;
      scene.addChild(Background);

      var Numbers = width/16*9+(width/20)+(width/25);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Numbers += (width/20)+(width/25);
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'blue';
          this.x = (width/50);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          scene.addChild(this);
        }
      });

      var Text =[];

      for (var i = 0; i <6; i++) {
        Text[i] = new Texts("");
      }

      var Time = 0;
      var Time2 = 0;
      var k = 0;
      var Text_defined = true;

      function T_D(){
        var s = true;
        if(b.substring(Time,Time+1)=="→"){
          s = false;
        }
        Time ++;
        if(s){
          Time2 ++;
          if(Time2==19){
            k++;
            Time2 = 0;
            if(b.substring(0,1)=="("){
              Text[k].text = " ";
              Time2 ++;
            }
            if(b.substring(0,1)=="「"){
              if(b.substring(Time-2,Time-1)!="」"){
                Text[k].text = "　";
                Time2 ++;
              }
            }
          }
          if(b.substring(Time-1,Time)=="↓"||Time2==19){
            if(Time2>1) k++;
            Time2 = 0;
            if(b.substring(0,1)=="("){
              Text[k].color = "blue";
              Text[k].text = " ";
              Time2 ++;
            }
            if(b.substring(0,1)=="("){
              Text[k].text = " ";
              Time2 ++;
            }
            if(b.substring(0,1)=="「"){
              if(b.substring(Time-2,Time-1)!="」"){
                Text[k].text = "　";
                Time2 ++;
              }
            }
          }
          else if(b.substring(Time-1,Time)!=""){
            if(Text[k].text.substring(0,1)=="("||Text[k].text.substring(0,1)==" ") Text[k].color = "blue";
            Text[k].text = Text[k].text+b.substring(Time-1,Time);
          }
          else if(b.substring(Time-1,Time)==""){
            Text_defined = false;
          }
        }
      }

      Background.addEventListener("enterframe",function(){
        T_D();
      })

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Enter1 = new Sprite(xxx,yyy);
      Enter1.image = core.assets["image/Buttons.png"];
      Enter1.scaleX = ((width/5)/xxx);
      Enter1.scaleY = (((width/5))/yyy);//ココが変換した場所
      Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
      Enter1.frame = 5;
      scene.addChild(Enter1);

      var xxx = core.assets["image/正方形/"+a+".png"].width;
      var yyy = core.assets["image/正方形/"+a+".png"].height;
      var Item = new Sprite(xxx,yyy);
      Item.scaleX = ((width/2)/xxx);
      Item.scaleY = ((width/2)/yyy);
      Item.image = core.assets["image/正方形/"+a+".png"];
      var X_0 = (Item.scaleX*xxx/2)-xxx/2;
      var Y_0 = (Item.scaleY*yyy/2)-yyy/2;
      Item.x = X_0 + width;
      Item.y = Y_0 + width/32;
      scene.addChild(Item);
      Sound_ON("Item",true);

      Item.addEventListener("enterframe",function(){
        if(Item.x < X_0+width/2-width/4-width/18 || Item.x > X_0+width/2-width/4+width/18){
          Item.x -= width/18;
        }
        else {
          Item.x = X_0+width/2-width/4;
        }
        if(Item.x<X_0-width/2){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      })

      Enter1.addEventListener('touchstart',function(e){
        if(Item.x>X_0+width/2-width/4){
          Item.x = X_0 + width/2 -width/4;
        }
        else if(Item.x==X_0+width/2-width/4) Item.x -= width/18+1;
        else{
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      });//進む
      return scene;
    }
    var ItemScene = function(Number,Ig){

      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (width/20)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (width/6);
      Text1.width = width;
      Text1.height = (width/20);
      Text1.text = "▶ 閉じる";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (width/20)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/1.6);
      Text2.y = (width/6);
      Text2.width = width;
      Text2.height = (width/20);
      Text2.text = "▶ 設定を開く";

      var Text21 = new Label();
      Text21.font  = (width/20)+"px monospace";
      Text21.color = 'black';
      Text21.x = (width/2.5);
      Text21.y = (width/6);
      Text21.width = width;
      Text21.height = (width/20);
      Text21.text = "▶ 人物";
      scene.addChild(Text21);

      var Text3 = new Label();
      Text3.font  = (width/20)+"px monospace";
      Text3.color = 'black';
      if(Ig) Text3.x = (width/1.6);
      else Text3.x = (width/1.3);
      Text3.y = (width/4) + ((width/20)+(width/25)*14);
      Text3.width = width;
      Text3.height = (width/20);
      Text3.text = "";

      var Text4 = new Label();
      Text4.font  = (width/20)+"px monospace";
      Text4.color = 'black';
      Text4.x = (width/8);
      Text4.y = (width/4) + ((width/20)+(width/25)*18);
      Text4.width = width;
      Text4.height = (width/20);
      Text4.text = "";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = (width/20)+"px monospace";
      Text5.color = 'black';
      Text5.x = (width/8);
      Text5.y = (width/4) + ((width/20)+(width/25)*20);
      Text5.width = width;
      Text5.height = (width/20);
      Text5.text = "";
      scene.addChild(Text5);

      var Text6 = new Label();
      Text6.font  = (width/20)+"px monospace";
      Text6.color = 'black';
      Text6.x = (width/8);
      Text6.y = (width/4) + ((width/20)+(width/25)*22);
      Text6.width = width;
      Text6.height = (width/20);
      Text6.text = "";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = (width/20)+"px monospace";
      Text7.color = 'black';
      Text7.x = (width/8);
      Text7.y = (width/4) + ((width/20)+(width/25)*24);
      Text7.width = width;
      Text7.height = (width/20);
      Text7.text = "";
      scene.addChild(Text7);

      var Text8 = new Label();
      Text8.font  = (width/20)+"px monospace";
      Text8.color = 'black';
      Text8.x = (width/1.3);
      Text8.y = (width/4) + ((width/20)+(width/25)*10);
      Text8.width = width;
      Text8.height = (width/20);
      Text8.text = "";

      var Text9 = new Label();
      Text9.font  = (width/20)+"px monospace";
      Text9.color = 'black';
      Text9.x = (width/8);
      Text9.y = (width/4) + ((width/20)+(width/25)*14);
      Text9.width = width;
      Text9.height = (width/20);
      Text9.text = "◀ 前";

      var Text10 = new Label();
      Text10.font  = (width/20)+"px monospace";
      Text10.color = 'black';
      Text10.x = (width/2.5);
      Text10.y = (width/4) + ((width/20)+(width/25)*14);
      Text10.width = width;
      Text10.height = (width/20);
      Text10.text = "▶ 次";

      if(Number.length>1){
        if(Number.substring(0,2)=="使う") Text3.text = "未表示";
        if(Number.length>2){
          if(Number.substring(0,3)=="調べる") Text3.text = "未表示";
          if(Number.length>4){
            if(Number.substring(0,5)=="つきつける") Text3.text = "未表示";
          }
        }
      }
      if(Text3.text==""){
        scene.addChild(Text8);
        scene.addChild(Text2);
        scene.addChild(Text3);
      }
      if(Ig){
        Text3.text = "";
        scene.addChild(Text3);
      }

      if(Item_Flag.length>5){
        scene.addChild(Text9);
        scene.addChild(Text10);
      }
      else Pages = 0;

      var Item_image = Class.create(Sprite,{
          initialize: function(a) {
              var xxx = core.assets["image/正方形/"+a+".png"].width;
              var yyy = core.assets["image/正方形/"+a+".png"].height;
              Sprite.call(this,xxx,yyy);
              this.scaleX = ((width/4)/xxx);
              this.scaleY = ((width/4)/yyy);
              this.image = core.assets["image/正方形/"+a+".png"];
              this.x = (this.scaleX*xxx/2)-xxx/2+(width/1.6);
              this.y = (this.scaleY*yyy/2)-yyy/2+(width/4)+(width/20)+(width/25);
          }
      });

      var Numbers = (width/4);
      var Items = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          Numbers += (width/20)+(width/25);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a[0];
          var Syousai_text = a[1].split("↓");
          if(Syousai_text[0]) this.text2 = Syousai_text[0];
          else this.text2 = "";
          if(Syousai_text[1]) this.text3 = Syousai_text[1];
          else this.text3 = "";
          if(Syousai_text[2]) this.text4 = Syousai_text[2];
          else this.text4 = "";
          if(Syousai_text[3]) this.text5 = Syousai_text[3];
          else this.text5 = "";
          Image[Item_Number] = new Item_image(a[2]);
          if(a[3]){
            if(a[3]=="停止") this.text6 = "■ 停止";
            else this.text6 = "▶ " + a[3];
            this.syousai = a[4];
          }
          else this.text6 = "";
          this.image_number = Item_Number;
          scene.addChild(this);
          Item_Number ++;
        }
      });

      var Item = [];
      var Image = [];
      var Choice_Item = "未設定";
      var Item_Number = 0;

      for (var i = 0; i < 5; i++) {
        if(Item_Flag[i+Pages]){
          Item[Item_Number] = new Items(Item_Flag[i+Pages]);
        };
      }

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        if(Text2.text=="▶ 設定を開く"){
          core.pushScene(SettingScene(Number));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        return;
      });

      Text21.addEventListener('touchstart',function(e){
        core.replaceScene(CharacterScene(Number,Ig));
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        if(this.text=="▶ 使う") Scene_loads(Number,true,"使う"+Choice_Item);
        else{
          if(Ig==Choice_Item||(Ig!="日常"&&(Choice_Item=="強欲な壺")||Choice_Item=="ヒントカード")){
            if(Choice_Item=="ヒントカード"){
              Scene_loads("ヒント"+Number,false,false);
              return;
            }
            if(Choice_Item=="強欲な壺"){
              Get_ICF("アイテム","強欲な壺","消失");
              Item_Flag[Item_Flag.length] = ["強欲なカケラ","強欲な壺を使った証。",31];
            }
            core.pushScene(PopScene(Number,"異議あり！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(Ig=="日常") Scene_loads(Number,true,"つきつける"+Choice_Item);
          else{
            core.pushScene(PopScene("つきつけ失敗","異議あり！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
        }
        return;
      });

      Text8.addEventListener('touchstart',function(e){
        if(this.text=="") return;
        else if(this.text=="▶ 再生"){
          Sound_ON(Choice_Item,true);
          for (var i = 0; i < Item_Flag.length; i++) {
            if(Item_Flag[i][0]==Choice_Item) break;
          }
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="■ 停止"){
          Sound_ON(Choice_Item,false);
          for (var i = 0; i < Item_Flag.length; i++) {
            if(Item_Flag[i][0]==Choice_Item) break;
          }
          core.popScene();
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="▶ 調べる"){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Inspect_loads(Number,Choice_Item);
        }
        else if(this.text=="▶ 遊ぶ"){
          OASOBI = true;
          core.popScene();
          core.pushScene(ReversiScene());
        }
        else {
          for (var i = 0; i < Item.length; i++) {
            if(Item[i].text.substring(2)==Choice_Item) break;
          }
          core.pushScene(DetailsScene(Item[i].syousai));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        return;
      });

      Text9.addEventListener('touchstart',function(e){
        if(Pages==0){
          Pages = Item_Flag.length-Item_Flag.length%5;
          if(Item_Flag.length%5==0) Pages-=5;
        }
        else Pages-=5;
        core.replaceScene(ItemScene(Number,Ig));
        return;
      });

      Text10.addEventListener('touchstart',function(e){
        if(Pages == Item_Flag.length-Item_Flag.length%5) Pages = 0;
        else{
          Pages+=5;
          if(Pages==Item_Flag.length) Pages = 0;
        }
        core.replaceScene(ItemScene(Number,Ig));
        return;
      });

      for (var i = 0; i < Item.length; i++){
        Item[i].addEventListener('touchstart',function(e){
          if(this.color=="black"){
            scene.addChild(Image[this.image_number]);
            Choice_Item = this.text;
            this.text = "▶ " + this.text;
            this.color = "red";
            if(Ig) Text3.text = "▶ つきつける";
            else Text3.text = "▶ 使う";
            Text4.text = this.text2;
            Text5.text = this.text3;
            Text6.text = this.text4;
            Text7.text = this.text5;
            Text8.text = this.text6;
          }
          else{
            scene.removeChild(Image[this.image_number]);
            this.text = this.text.substring(2);
            this.color = "black";
            Text3.text = "";
            Text4.text = "";
            Text5.text = "";
            Text6.text = "";
            Text7.text = "";
            Text8.text = "";
          }
          for (var k = 0; k < Item.length; k++){
            if(Item[k].color=="red"&&this!=Item[k]){
              scene.removeChild(Image[k]);
              Item[k].text = Item[k].text.substring(2);
              Item[k].color = "black";
            }
          }
          return;
        });
      }

      return scene;
    }
    var CharacterScene = function(Number,Ig){

      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (width/20)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (width/6);
      Text1.width = width;
      Text1.height = (width/20);
      Text1.text = "▶ 閉じる";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (width/20)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/1.6);
      Text2.y = (width/6);
      Text2.width = width;
      Text2.height = (width/20);
      Text2.text = "▶ 設定を開く";

      var Text21 = new Label();
      Text21.font  = (width/20)+"px monospace";
      Text21.color = 'black';
      Text21.x = (width/2.5);
      Text21.y = (width/6);
      Text21.width = width;
      Text21.height = (width/20);
      Text21.text = "▶ 持物";
      scene.addChild(Text21);

      var Text3 = new Label();
      Text3.font  = (width/20)+"px monospace";
      Text3.color = 'black';
      if(Ig) Text3.x = (width/1.6);
      else Text3.x = (width/1.3);
      Text3.y = (width/4) + ((width/20)+(width/25)*14);
      Text3.width = width;
      Text3.height = (width/20);
      Text3.text = "";

      var Text4 = new Label();
      Text4.font  = (width/20)+"px monospace";
      Text4.color = 'black';
      Text4.x = (width/8);
      Text4.y = (width/4) + ((width/20)+(width/25)*18);
      Text4.width = width;
      Text4.height = (width/20);
      Text4.text = "";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = (width/20)+"px monospace";
      Text5.color = 'black';
      Text5.x = (width/8);
      Text5.y = (width/4) + ((width/20)+(width/25)*20);
      Text5.width = width;
      Text5.height = (width/20);
      Text5.text = "";
      scene.addChild(Text5);

      var Text6 = new Label();
      Text6.font  = (width/20)+"px monospace";
      Text6.color = 'black';
      Text6.x = (width/8);
      Text6.y = (width/4) + ((width/20)+(width/25)*22);
      Text6.width = width;
      Text6.height = (width/20);
      Text6.text = "";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = (width/20)+"px monospace";
      Text7.color = 'black';
      Text7.x = (width/8);
      Text7.y = (width/4) + ((width/20)+(width/25)*24);
      Text7.width = width;
      Text7.height = (width/20);
      Text7.text = "";
      scene.addChild(Text7);

      var Text8 = new Label();
      Text8.font  = (width/20)+"px monospace";
      Text8.color = 'black';
      Text8.x = (width/1.3);
      Text8.y = (width/4) + ((width/20)+(width/25)*10);
      Text8.width = width;
      Text8.height = (width/20);
      Text8.text = "";

      var Text9 = new Label();
      Text9.font  = (width/20)+"px monospace";
      Text9.color = 'black';
      Text9.x = (width/8);
      Text9.y = (width/4) + ((width/20)+(width/25)*14);
      Text9.width = width;
      Text9.height = (width/20);
      Text9.text = "◀ 前";

      var Text10 = new Label();
      Text10.font  = (width/20)+"px monospace";
      Text10.color = 'black';
      Text10.x = (width/2.5);
      Text10.y = (width/4) + ((width/20)+(width/25)*14);
      Text10.width = width;
      Text10.height = (width/20);
      Text10.text = "▶ 次";

      if(Number.length>1){
        if(Number.substring(0,2)=="使う") Text3.text = "未表示";
        if(Number.length>2){
          if(Number.substring(0,3)=="調べる") Text3.text = "未表示";
          if(Number.length>4){
            if(Number.substring(0,5)=="つきつける") Text3.text = "未表示";
          }
        }
      }
      if(Text3.text==""){
        scene.addChild(Text8);
        scene.addChild(Text2);
        scene.addChild(Text3);
      }
      if(Ig){
        Text3.text = "";
        scene.addChild(Text3);
      }

      if(Character_Flag.length>5){
        scene.addChild(Text9);
        scene.addChild(Text10);
      }
      else Pages2 = 0;

      var Character_image = Class.create(Sprite,{
          initialize: function(a) {
              var xxx = core.assets["image/正方形/"+a+".png"].width;
              var yyy = core.assets["image/正方形/"+a+".png"].height;
              Sprite.call(this,xxx,yyy);
              this.scaleX = ((width/4)/xxx);
              this.scaleY = ((width/4)/yyy);
              this.image = core.assets["image/正方形/"+a+".png"];
              this.x = (this.scaleX*xxx/2)-xxx/2+(width/1.6);
              this.y = (this.scaleY*yyy/2)-yyy/2+(width/4)+(width/20)+(width/25);
          }
      });

      var Numbers = (width/4);
      var Characters = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          Numbers += (width/20)+(width/25);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a[0];
          var Syousai_text = a[1].split("↓");
          if(Syousai_text[0]) this.text2 = Syousai_text[0];
          else this.text2 = "";
          if(Syousai_text[1]) this.text3 = Syousai_text[1];
          else this.text3 = "";
          if(Syousai_text[2]) this.text4 = Syousai_text[2];
          else this.text4 = "";
          if(Syousai_text[3]) this.text5 = Syousai_text[3];
          else this.text5 = "";
          Image[Character_Number] = new Character_image(a[2]);
          if(a[3]){
            if(a[3]=="停止") this.text6 = "■ 停止";
            else this.text6 = "▶ " + a[3];
            this.syousai = a[4];
          }
          else this.text6 = "";
          this.image_number = Character_Number;
          scene.addChild(this);
          Character_Number ++;
        }
      });

      var Character = [];
      var Image = [];
      var Choice_Character = "未設定";
      var Character_Number = 0;

      for (var i = 0; i < 5; i++) {
        if(Character_Flag[i+Pages2]){
          Character[Character_Number] = new Characters(Character_Flag[i+Pages2]);
        };
      }

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        if(Text2.text=="▶ 設定を開く"){
          core.pushScene(SettingScene(Number));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        return;
      });

      Text21.addEventListener('touchstart',function(e){
        core.replaceScene(ItemScene(Number,Ig));
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        if(this.text=="▶ 使う") Scene_loads(Number,true,"使う"+Choice_Character);
        else{
          if(Ig==Choice_Character){
            core.pushScene(PopScene(Number,"異議あり！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(Ig=="日常") Scene_loads(Number,true,"つきつける"+Choice_Character);
          else{
            core.pushScene(PopScene("つきつけ失敗","異議あり！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
        }
        return;
      });

      Text8.addEventListener('touchstart',function(e){
        if(this.text=="") return;
        else if(this.text=="▶ 再生"){
          Sound_ON(Choice_Character,true);
          for (var i = 0; i < Character_Flag.length; i++) {
            if(Character_Flag[i][0]==Choice_Character) break;
          }
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="■ 停止"){
          Sound_ON(Choice_Character,false);
          for (var i = 0; i < Character_Flag.length; i++) {
            if(Character_Flag[i][0]==Choice_Character) break;
          }
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="▶ 調べる"){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Inspect_loads(Number,Choice_Character);
        }
        else {
          for (var i = 0; i < Character.length; i++) {
            if(Character[i].text.substring(2)==Choice_Character) break;
          }
          core.pushScene(DetailsScene(Character[i].syousai));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        return;
      });

      Text9.addEventListener('touchstart',function(e){
        if(Pages2==0){
          Pages2 = Character_Flag.length-Character_Flag.length%5;
          if(Character_Flag.length%5==0) Pages2-=5;
        }
        else Pages2-=5;
        core.replaceScene(CharacterScene(Number,Ig));
        return;
      });

      Text10.addEventListener('touchstart',function(e){
        if(Pages2 == Character_Flag.length-Character_Flag.length%5) Pages2 = 0;
        else{
          Pages2+=5;
          if(Pages2==Character_Flag.length) Pages2 = 0;
        }
        core.replaceScene(CharacterScene(Number,Ig));
        return;
      });

      for (var i = 0; i < Character.length; i++){
        Character[i].addEventListener('touchstart',function(e){
          if(this.color=="black"){
            scene.addChild(Image[this.image_number]);
            Choice_Character = this.text;
            this.text = "▶ " + this.text;
            this.color = "red";
            if(Ig) Text3.text = "▶ つきつける";
            else Text3.text = "";
            Text4.text = this.text2;
            Text5.text = this.text3;
            Text6.text = this.text4;
            Text7.text = this.text5;
            Text8.text = this.text6;
          }
          else{
            scene.removeChild(Image[this.image_number]);
            this.text = this.text.substring(2);
            this.color = "black";
            Text3.text = "";
            Text4.text = "";
            Text5.text = "";
            Text6.text = "";
            Text7.text = "";
            Text8.text = "";
          }
          for (var k = 0; k < Character.length; k++){
            if(Character[k].color=="red"&&this!=Character[k]){
              scene.removeChild(Image[k]);
              Character[k].text = Character[k].text.substring(2);
              Character[k].color = "black";
            }
          }
          return;
        });
      }

      return scene;
    }
    var DetailsScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = (width/20);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          Numbers += (width/20)+(width/25);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/12);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          scene.addChild(this);
        }
      });

      var Text = [];

      Text[0] = new Texts("▶ 閉じる");

      if(Number.length==11){
        var Video = new Entity()
        Video.visible =  true;
        Video._element = document.createElement('div')
        Video.x = (width/10);
        Video.y = Numbers+(width/5);
        Video._element.innerHTML = '<iframe src="https://www.youtube.com/embed/'+Number+'?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="'+(width*0.8)+'" height="'+(width/16*9*0.8)+'" frameborder="0" id="player"></iframe>'
        scene.addChild(Video);
      }
      else{
        var S_Text = Number.replace(/\n/g,"↓").split("↓");
        for (var i = 1; i < S_Text.length+1; i++) {
          Text[i] = new Texts(S_Text[i-1]);
          if(i==13) break;
        }
      }

      var Pages3 = -1;

      for (var i = 1; i < Text.length; i++) {
        Text[i].addEventListener('touchstart',function(e){
          if(this.text=="▶ 次のページ"){
            Pages3 += 13;
            for (var i = 1; i < Text.length; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
          else if(this.text=="▶ 前のページ"){
            Pages3 -= 13;
            for (var i = 1; i < Text.length; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
          else if(this.text=="▶ 最初のページ"){
            Pages3 = -1;
            for (var i = 1; i < 14; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
        });
      }

      Text[0].addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    };
    var SoundScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (width/20)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (width/20);
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Numbers = (height/4);
      var Text = [];
      var Text2 = [];
      var Text_Number = 10;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.c = Text_Number;
          this.text = "▶ "+a;
          scene.addChild(this);
          Text2[Text_Number] = new Texts2(Flag[Text_Number]);
        }
      });

      var Texts2 = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/8)+(width/8)+(width/8)+(width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          if(a) this.text = "現在はオンです。";
          else this.text = "現在はオフです。";
          scene.addChild(this);
          Numbers += (width/8);
          Text_Number ++;
        }
      });

      Text[Text_Number] = new Texts("ボタン");
      Text[Text_Number] = new Texts("トロフィー");
      Text[Text_Number] = new Texts("アイテム");
      Text[Text_Number] = new Texts("異議あり！");
      Text[Text_Number] = new Texts("待った！");

      for (var i = 10; i < Text.length; i++) {
        Text[i].addEventListener('touchstart',function(e){
          if(Flag[this.c]){
            Flag[this.c] = false;
            Text2[this.c].text = "現在はオフです。";
          }
          else{
            Flag[this.c] = true;
            Text2[this.c].text = "現在はオンです。";
          }
          switch (this.c) {
            case 10:
              Sound_ON("Choice",true);
              break;
            case 11:
              Sound_ON("Trophies",true);
              break;
            case 12:
              Sound_ON("Item",true);
              break;
            case 13:
              Sound_ON("異議あり！",true);
              break;
            case 14:
              Sound_ON("待った！",true);
              break;
          }
          return;
        });
      }

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    }
    var ClearScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = core.assets["image/Background.png"].width;
      var yyy = core.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = core.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = (width/20);

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          Numbers += (width/20)+(width/25)+(width/25)+(width/25)+(width/25)+(width/25);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/15);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          i++;
          scene.addChild(this);
        }
      });

      var Text = [];

      Text[0] = new Texts("データを初期化する？");
      Text[1] = new Texts("▶ はい");
      Text[2] = new Texts("▶ いいえ");

      Text[1].addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Data = false;
        window.localStorage.clear();
        Rewind = 0;
        Skip = 0;
        Before = 0;
        After = 0;
        Datas = [];
        Flag = ["男","主人公","男",1,1,21,10,"0乙0",true,false,false,false,false,false,false,false];
        //3早戻し,4本線,5先送り,6体力,7ページ,8オートセーブ,9おまけ裁判,10選択音,11トロフィー音,12アイテム音,13異議あり!音,14待った！音;
        Item_Flag = [];//所持アイテム
        Character_Flag = [];//人物
        Pages = 0;//アイテムのページ
        Pages2 = 0;//人物のページ
        T_Name = "";
        Text = "";
        Scene_type = "メイン";
        Scene_kazu = 1;
        Get = false;
        core.replaceScene(TitleScene());
        return;
      });

      Text[2].addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    }
    var ReversiScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Saikyo = false;
      var AI = 100;//AIの先攻後攻設定
      var okerutenmetu = 0;//置ける場所の表示
      var kazutenmetu = 0;//置ける場所にひっくり返る数表示
      var Time_Start = 0;
      var bamen = 0;
      var Intiki = false;

      var va = 1;
      var te = 1;
      var Kagayaki = 1;
      var Time = 0;
      var Time_Hand = 5;
      var Time_R_ensyutu = 0;
      var Time_Kagayaki = 0;
      var Black_Number = 0;
      var White_Number = 0;

      var Pointer = new Sprite(1,1);
      Pointer.image = core.assets["image/Hand.png"];

      var White = new Sprite(405,600);
      White.image = core.assets["image/white.png"];
      scene.addChild(White);

      var Reversi = new Sprite(405,405);
      Reversi.image = core.assets["image/正方形/30.png"];
      Reversi.x = 0;
      Reversi.y = 40;
      scene.addChild(Reversi);

      var Set_button = new Sprite(195,95);
      Set_button.image = core.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 195;
      scene.addChild(Set_button);

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = core.assets["image/Set_button.png"];
      Set_button1.x = 5;
      Set_button1.y = 295;
      Set_button1.frame = 1;
      scene.addChild(Set_button1);

      var Set_button2 = new Sprite(195,95);
      Set_button2.image = core.assets["image/Set_button.png"];
      Set_button2.x = 205;
      Set_button2.y = 295;
      Set_button2.frame = 2;
      scene.addChild(Set_button2);

      var Set_button3 = new Sprite(195,95);
      Set_button3.image = core.assets["image/Set_button.png"];
      Set_button3.x = 205;
      Set_button3.y = 145;
      Set_button3.frame = 9;

      var Set_button4 = new Sprite(195,95);
      Set_button4.image = core.assets["image/Set_button.png"];
      Set_button4.x = 105;
      Set_button4.y = 455;
      Set_button4.frame = 13;
      scene.addChild(Set_button4);
      Set_button4.addEventListener('touchstart',function(e){
        core.pushScene(ReturnScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button5 = new Sprite(195,95);
      Set_button5.image = core.assets["image/Set_button.png"];
      Set_button5.x = 105;
      Set_button5.y = 245;
      Set_button5.frame = 11;

      var Stone = Class.create(Sprite, {
        initialize: function(x,y,z) {
          Sprite.call(this, 45, 45);
          this.x = 50*x+5;
          this.y = 50*y+45;
          this.image = core.assets['image/stone.png'];
          //scene.addChild(this);
          this.ura = z;
          if(z==3) z = 1;
          this.frame = z;
        }
      });

      var text = Class.create(Label, {
        initialize: function(x,y,ward) {
          Label.call(this);
          this.x = 50*x+5;
          this.y = 50*y+45;
          this.color = 'red';
          this.font = '20px "Arial"';
          this.on('enterframe', function(){
            this.text = (ward);
          });
        }
      });

      var Stones = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];
      var uragaerukazu = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var urahyouzi = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var priority = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var priority_cat = [
        [-300,-20,-20,-20,-20,-20,-20,-300],
        [-20,1,-1,-1,-1,-1,1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,1,-1,-1,-1,-1,1,-20],
        [-300,-20,-20,-20,-20,-20,-20,-300]
      ];

      var priority_otter = [
        [3,2,2,2,2,2,2,3],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [3,2,2,2,2,2,2,3]
      ];

      var priority_people = [
        [ 30,-12,  0, -1, -1,  0,-12, 30],
        [-12,-15, -3, -3, -3, -3,-15,-12],
        [  0, -3,  0, -1, -1,  0, -3,  0],
        [ -1, -3, -1, -1, -1, -1, -3, -1],
        [ -1, -3, -1, -1, -1, -1, -3, -1],
        [  0, -3,  0, -1, -1,  0, -3,  0],
        [-12,-15, -3, -3, -3, -3,-15,-12],
        [ 30,-12,  0, -1, -1,  0,-12, 30]
      ];

      var Cheetah = [
        [ 0,90, 3, 5, 5, 3,90, 0],
        [90, 0, 1, 1, 1, 1, 0,90],
        [ 3, 1, 1, 1, 1, 1, 1, 3],
        [ 5, 1, 1, 1, 1, 1, 1, 5],
        [ 5, 1, 1, 1, 1, 1, 1, 5],
        [ 3, 1, 1, 1, 1, 1, 1, 3],
        [90, 0, 1, 1, 1, 1, 0,90],
        [ 0,90, 3, 5, 5, 3,90, 0]
      ];

      for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
          var z = Stones[y][x];
          Stones[y][x] = new Stone(x,y,z);
          var z = uragaerukazu[y][x];
          urahyouzi[y][x] = new text(x,y,z);
        }
      }

      var Hand = new Sprite(280,370);
      Hand.image = core.assets["image/Hand.png"];

      /*var label = new Label();
      label.x = 5;
      label.y = 5;
      label.color = 'black';
      label.font = '40px "Arial"';
      label.on('enterframe', function(){
        label.text = (Time_R_ensyutu);
      });
      scene.addChild(label);*/

      var label1 = new Label();
      label1.x = 5;
      label1.y = 5;
      label1.color = 'black';
      label1.font = '40px "Arial"';
      label1.on('enterframe', function(){
        if(va==1) var van = "黒の番";
        if(va==2) var van = "白の番";
        if(va==3){
          var van = "";
          W_D();
        }
        label1.text = (van);
      });
      //scene.addChild(label1);

      var label2 = new Label();
      label2.x = 155;
      label2.y = 20;
      label2.color = 'black';
      label2.font = '20px "Arial"';
      label2.on('enterframe', function(){
        kazoeru();
        var van = "黒"+Black_Number;
        label2.text = (van);
      });
      //scene.addChild(label2);

      var label3 = new Label();
      label3.x = 205;
      label3.y = 20;
      label3.color = 'black';
      label3.font = '20px "Arial"';
      label3.on('enterframe', function(){
        kazoeru();
        var van = "白"+White_Number;
        label3.text = (van);
      });
      //scene.addChild(label3);

      var label4 = new Label();
      label4.x = 255;
      label4.y = 20;
      label4.color = 'black';
      label4.font = '20px "Arial"';
      label4.on('enterframe', function(){
        if(va==3) var van = "";
        else var van = te + "手目";
        label4.text = (van);
      });
      //scene.addChild(label4);

      function kazoeru(){
        Black_Number = 0;
        White_Number = 0;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==1) Black_Number++;
            if(Stones[y][x].ura==2) White_Number++;
          }
        }
      }

      function bankirikae(){
        if(va==1||va==10) va = 2;
        else if(va==2||va==20) va = 1;
        else ;
      }

      function hyouzisuru(){
        bamen = 3;
        te = 1;
        Pointer.y     = 0;
        Set_button.y  = 500;
        Set_button1.y = 500;
        Set_button2.y = 500;
        scene.removeChild(Pointer);
        scene.removeChild(Set_button);
        scene.removeChild(Set_button1);
        scene.removeChild(Set_button2);
        scene.removeChild(Set_button3);
        scene.removeChild(Set_button5);
        scene.addChild(label1);
        scene.addChild(label2);
        scene.addChild(label3);
        scene.addChild(label4);
        reset();
        va = 1;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            scene.addChild(Stones[y][x]);
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            operating(x,y,va);
          }
        }
      }

      Reversi.addEventListener("enterframe",function(){//常に動く
        if(bamen==0) return;
        if(Time_Hand>5) scene.removeChild(Hand);
        if(va==AI&&Time_Hand>10) AI_dousa(); //AIが置くまでの時間
        if(Time_R_ensyutu>0) Time_R_ensyutu = 0;
        Time++;
        Time_R_ensyutu++;
        Time_Hand++;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            Flashing(x,y);
          }
        }
        Time_Kagayaki = Time_Kagayaki+0.2*Kagayaki;
        if(Time_Kagayaki>=0.8||Time_Kagayaki<=0.01) Kagayaki = Kagayaki*(-1);
      })

      function  Flashing(x,y){
        scene.addChild(Pointer);
        Pointer.x = 0;
        Pointer.y = 0;
        scene.removeChild(Pointer);
        if(Stones[y][x].ura==3){
          if(Time_R_ensyutu>0){
            if(va==AI) var aw = 1;//AIの時は演出カット = 0
            else var aw = 1;
            Stones[y][x].opacity = Time_Kagayaki*aw*okerutenmetu;//置ける場所点滅表示
            urahyouzi[y][x].opacity = 1*aw*kazutenmetu;//置ける数表示
          }
          else{
            Stones[y][x].opacity = 0;
            urahyouzi[y][x].opacity = 0;//置ける場所点滅表示
          }
        }
        else if(Stones[y][x].ura==10){
          if(Time_R_ensyutu<-5)Stones[y][x].frame = 3;
          else if(Time_R_ensyutu>-5&&Time_R_ensyutu<-3) Stones[y][x].frame = 4;
          else if(Time_R_ensyutu>-3&&Time_R_ensyutu<-1) Stones[y][x].frame = 5;
          else if(Time_R_ensyutu==0){
            Stones[y][x].ura = 1;
            Stones[y][x].frame = 1;
          }
        }
        else if(Stones[y][x].ura==20){
          if(Time_R_ensyutu<-5)Stones[y][x].frame = 6;
          else if(Time_R_ensyutu>-5&&Time_R_ensyutu<-3) Stones[y][x].frame = 7;
          else if(Time_R_ensyutu>-3&&Time_R_ensyutu<-1) Stones[y][x].frame = 8;
          else if(Time_R_ensyutu==0){
            Stones[y][x].ura = 2;
            Stones[y][x].frame = 2;
          }
        }
        else Stones[y][x].opacity = 1;
      }

      function okuugoki(){
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].intersect(Pointer)&&Stones[y][x].ura==3&&Time>0){//接触
              Time_Hand = 0;
              console.log(te+"手目横"+(x+1)+"縦"+(y+1));
              te++;
              Stones[y][x].ura = va;
              operating(x,y,va,true);
              bankirikae();
              for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                  operating(x,y,va);
                }
              }
            }
          }
        }
        var okeru = false;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==3) okeru = true;
          }
        }
        if(okeru==false){
          bankirikae();
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              operating(x,y,va);
            }
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==3) okeru = true;
          }
        }
        if(okeru==false) va = 3;
      }

      function reset(){
        va = 2;
        Time = 0;
        Time_Hand = 5;
        Time_R_ensyutu = 0;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            Stones[y][x].ura = 0;
            Stones[y][x].frame = 0;
            if(x==3&&y==3){
              Stones[y][x].ura = 2;
              Stones[y][x].frame = 2;
            }
            if(x==4&&y==4){
              Stones[y][x].ura = 2;
              Stones[y][x].frame = 2;
            }
            if(x==3&&y==4){
              Stones[y][x].ura = 1;
              Stones[y][x].frame = 1;
            }
            if(x==4&&y==3){
              Stones[y][x].ura = 1;
              Stones[y][x].frame = 1;
            }
          }
        }
      }

      function operating(x,y,z,t){
        var ura_kazu = 0;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右方向
          if(Stones[y][i].ura==0||Stones[y][i].ura==3) break;
          if(Stones[y][i].ura==z){
            ura_TF = true;
            break;
          }
        }
        for(var k = x + 1; k < i; k++){
          if(ura_TF == false) break;
          if(t==true) reber(k,y,z);
          ura_kazu++;
        }//右方向

        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左方向
          if(Stones[y][i].ura==0||Stones[y][i].ura==3) break;
          if(Stones[y][i].ura==z||Stones[y][i].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = x - 1; k > i; k--){
          if(ura_TF == false) break;
          if(t==true) reber(k,y,z);
          ura_kazu++;
        }//左方向

        var ura_TF = false;
        for(var i = y - 1; i >= 0; i--){//上方向
          if(Stones[i][x].ura==0||Stones[i][x].ura==3) break;
          if(Stones[i][x].ura==z||Stones[i][x].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = y - 1; k > i; k--){
          if(ura_TF == false) break;
          if(t==true) reber(x,k,z);
          ura_kazu++;
        }//上方向

        var ura_TF = false;
        for(var i = y + 1; i < 8; i++){//下方向
          if(Stones[i][x].ura==0||Stones[i][x].ura==3) break;
          if(Stones[i][x].ura==z||Stones[i][x].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = y + 1; k < i; k++){
          if(ura_TF == false) break;
          if(t==true) reber(x,k,z);
          ura_kazu++;
        }//下方向

        var k = 1;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右上方向
          if(y==0) break;
          if(Stones[y-k][i].ura==0||Stones[y-k][i].ura==3) break;
          if(Stones[y-k][i].ura==z||Stones[y-k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y-k==0) break;
          k++;
        }
        var k = 1;
        for(var s = x + 1; s < i; s++){
          if(ura_TF == false) break;
          if(y==0) break;
          if(t==true) reber(s,y-k,z);
          ura_kazu++;
          if(y-k==0) break;
          k++;
        };//右上方向

        var k = 1;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右下方向
          if(y==7) break;
          if(Stones[y+k][i].ura==0||Stones[y+k][i].ura==3) break;
          if(Stones[y+k][i].ura==z||Stones[y+k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y+k==7) break;
          k++;
        }
        var k = 1;
        for(var s = x + 1; s < i; s++){
          if(ura_TF == false) break;
          if(y==7) break;
          if(t==true) reber(s,y+k,z);
          ura_kazu++;
          if(y+k==7) break;
          k++;
        }//右下方向

        var k = 1;
        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左上方向
          if(y==0) break;
          if(Stones[y-k][i].ura==0||Stones[y-k][i].ura==3) break;
          if(Stones[y-k][i].ura==z||Stones[y-k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y-k==0) break;
          k++;
        }
        var k = 1;
        for(var s = x - 1; s > i; s--){
          if(ura_TF == false) break;
          if(y==0) break;
          if(t==true) reber(s,y-k,z);
          ura_kazu++;
          if(y-k==0) break;
          k++;
        };//左上方向

        var k = 1;
        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左下方向
          if(y==7) break;
          if(Stones[y+k][i].ura==0||Stones[y+k][i].ura==3) break;
          if(Stones[y+k][i].ura==z||Stones[y+k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y+k==7) break;
          k++;
        }
        var k = 1;
        for(var s = x - 1; s > i; s--){
          if(ura_TF == false) break;
          if(y==7) break;
          if(t==true) reber(s,y+k,z);
          ura_kazu++;
          if(y+k==7) break;
          k++;
        }
        if(t==true) return;
        if(ura_kazu>0&&(Stones[y][x].ura==0||Stones[y][x].ura==3)){
          Stones[y][x].ura = 3;
          Stones[y][x].frame = z;
        }
        else {
          if(Stones[y][x].ura==3){
            Stones[y][x].ura = 0;
            Stones[y][x].frame = 0;
          }
        }
        if (Stones[y][x].ura!=0&&Stones[y][x].ura!=3) ura_kazu = 0;
        uragaerukazu[y][x] = ura_kazu;
        if(ura_kazu>0){
          scene.removeChild(urahyouzi[y][x]);
          urahyouzi[y][x] = new text(x,y,uragaerukazu[y][x]);
          scene.addChild(urahyouzi[y][x]);
        }
        else {
          scene.removeChild(urahyouzi[y][x]);
        }
      }

      function operating_AI(){
        var Max = -1000000000;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(uragaerukazu[y][x]==0) continue;
            if(uragaerukazu[y][x]*priority[y][x]>Max){
              Max = uragaerukazu[y][x]*priority[y][x];
              var Max_x = x;
              var Max_y = y;
            }
          }
        }
        if(Max_x>3&&(Hand.frame==0||Hand.frame==1||Hand.frame==2)){
          Hand.frame += 3;
        }
        else if(Max_x<=3&&(Hand.frame==3||Hand.frame==4||Hand.frame==5)){
          Hand.frame -= 3;
        }
        if(Max_x>3&&Hand.frame==6){
          Hand.frame = 8;
        }
        else if(Max_x<=3&&Hand.frame==8){
          Hand.frame = 6;
        }
        return("横"+Max_x+"縦"+Max_y);
      }

      function reber(x,y,z){
        Time_R_ensyutu = -7;
        Stones[y][x].ura = 10*z;
      }

      function AI_dousa(){
        var text = operating_AI();
        x = text.substring(1,2)*1;
        y = text.substring(3,4)*1;
        Hand.x = x*50-230;
        Hand.y = y*50-300;
        if(Hand.frame==3||Hand.frame==4||Hand.frame==5||Hand.frame==8){
          Hand.x += 240;
        }
        scene.addChild(Hand);
        Pointer.x = x*50+25;
        Pointer.y = y*50+65;
        scene.addChild(Pointer);
        scene.removeChild(Pointer);
        okuugoki();
      }

      function W_D(){
          if(Time_R_ensyutu!=0||AI == 100) return;
          var V_or_D = new Sprite(405,405);
          V_or_D.image = core.assets["image/V_or_D.png"];
          V_or_D.x = 0;
          V_or_D.y = 40;
          if(Black_Number>White_Number){
            if(AI == 1)V_or_D.frame = 2;
            if(AI == 2){
              V_or_D.frame = 1;
              if(OASOBI) OASOBI = "勝ち";
            }
          }
          else if(Black_Number<White_Number){
            if(AI == 1){
              V_or_D.frame = 1;
              if(OASOBI) OASOBI = "勝ち";
            }
            if(AI == 2)V_or_D.frame = 2;
          }
          else V_or_D.frame = 3;
          if(Hand.frame==6||Hand.frame==8){
            if(V_or_D.frame==2) V_or_D.frame = 0;
            if(V_or_D.frame==1){
              V_or_D.frame = 4;
              if(Saikyo) V_or_D.frame = 5;
              if(OASOBI=="勝ち") OASOBI = "エクセレント";
            }
          }
          scene.addChild(V_or_D);
          console.log(Black_Number);
          console.log(White_Number);
          if(OASOBI=="エクセレント"){
            OASOBI = true;
            core.pushScene(ItemgetScene(27,"おめでとうございます！↓賞品として強欲な壺をプレゼント！","リバーシ"));
            Item_Flag[Item_Flag.length] = ["強欲な壺","チーター(強)に勝って貰った賞品。↓尋問時につきつけると先へ進める。↓その後強欲な壺が一つ無くなり↓強欲なカケラを入手する。",33];
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(OASOBI=="勝ち"){
            OASOBI = true;
            core.pushScene(ItemgetScene(32,"おめでとうございます！↓賞品としてヒントカードをプレゼント！","リバーシ"));
            Item_Flag[Item_Flag.length] = ["ヒントカード","AIに勝って貰った賞品。↓尋問時につきつけると↓ヒントと交換してもらえる。",32];
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
      }

      scene.on("touchstart",function(e){
        if((Time_Hand>5&&va!=AI)||AI == 100){
          Pointer.x = e.x;
          Pointer.y = e.y;
          scene.addChild(Pointer);
          scene.removeChild(Pointer);
          okuugoki();
        }
        if(Set_button.intersect(Pointer)){
          if(bamen==0){
            bamen++;
            Time = 0;
            Set_button.frame  = 3;
            Set_button1.frame = 4;
            Set_button2.frame = 5;
            scene.addChild(Set_button1);
            scene.addChild(Set_button2);
          }
          else if(bamen==1&&Time>0) hyouzisuru();
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 1;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_otter[y][x];
              }
            }
          }
        }
        if(Set_button1.intersect(Pointer)){
          if(bamen==0){
            okerutenmetu = 1;
            scene.removeChild(Set_button1);
          }
          else if(bamen==1){
            AI = 1;
            bamen++;
            Time = 0;
            Set_button.frame  = 7;
            Set_button1.frame = 6;
            Set_button2.frame = 8;
            Set_button.x = 205;
            Set_button.y = 45;
            Set_button1.x = 5;
            Set_button1.y = 45;
            Set_button2.x = 5;
            Set_button2.y = 145;
            scene.addChild(Set_button3);
            scene.addChild(Set_button5);
          }
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 0;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_cat[y][x];
              }
            }
          }
        }
        if(Set_button2.intersect(Pointer)){
          if(bamen==0){
            kazutenmetu = 1;
            scene.removeChild(Set_button2);
          }
          else if(bamen==1){
            AI = 2;
            bamen++;
            Time = 0;
            Set_button.frame  = 7;
            Set_button1.frame = 6;
            Set_button2.frame = 8;
            Set_button.x = 205;
            Set_button.y = 45;
            Set_button1.x = 5;
            Set_button1.y = 45;
            Set_button2.x = 5;
            Set_button2.y = 145;
            scene.addChild(Set_button3);
            scene.addChild(Set_button5);
          }
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 2;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_people[y][x];
              }
            }
          }
        }
        if(Set_button3.intersect(Pointer)&&bamen==2&&Time>0){
          hyouzisuru();
          Stones[0][0].ura = AI;
          Stones[0][0].frame = AI;
          Stones[0][7].ura = AI;
          Stones[0][7].frame = AI;
          Stones[7][0].ura = AI;
          Stones[7][0].frame = AI;
          Stones[7][7].ura = AI;
          Stones[7][7].frame = AI;
          Hand.frame = 6;
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              priority[y][x] = priority_otter[y][x];
            }
          }
        }
        if(Set_button5.intersect(Pointer)&&bamen==2&&Time>0){
          Saikyo = true;
          hyouzisuru();
          Stones[0][0].ura = AI;
          Stones[0][0].frame = AI;
          Stones[0][7].ura = AI;
          Stones[0][7].frame = AI;
          Stones[7][0].ura = AI;
          Stones[7][0].frame = AI;
          Stones[7][7].ura = AI;
          Stones[7][7].frame = AI;
          Hand.frame = 6;
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              priority[y][x] = Cheetah[y][x];
            }
          }
        }
      })
      return scene;
    };
    var ReturnScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var White = new Sprite(405,600);
      White.image = core.assets["image/white.png"];
      scene.addChild(White);

      var Set_button = new Sprite(195,95);
      Set_button.image = core.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 195;
      Set_button.frame = 12;
      scene.addChild(Set_button);
      Set_button.addEventListener('touchstart',function(e){
        core.popScene();
        core.replaceScene(ReversiScene());
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = core.assets["image/Set_button.png"];
      Set_button1.x = 105;
      Set_button1.frame = 14;
      scene.addChild(Set_button1);
      Set_button1.addEventListener('touchstart',function(e){
        OASOBI = false;
        core.popScene();
        core.popScene();
        Scene_kazu--;
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button2 = new Sprite(195,95);
      Set_button2.image = core.assets["image/Set_button.png"];
      Set_button2.x = 105;
      Set_button2.y = 455;
      Set_button2.frame = 10;
      scene.addChild(Set_button2);
      Set_button2.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      return scene;
    };
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
