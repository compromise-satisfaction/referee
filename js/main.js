enchant();

var Version = "バージョン 3.6";

switch (GitHub_type) {
  case "referee":
    var GAS = "https://script.google.com/macros/s/AKfycbykP5rFHcjf_Sd-u0u5_iRoqUlHNl_A02IyjsECYOeaO_Vn00Ap/exec";
    break;
  case "Share":
    var GAS = "https://script.google.com/macros/s/AKfycbyfEnjDE8FhsxIo97tN5hsvYF_nSW47gwYia54D0-JPgyWti0K4/exec";
    break;
  case "novel_game":
    var GAS = "https://script.google.com/macros/s/AKfycbwpMKf5237VlebQuUNjHKYGvLrOi3bdGV1Oa2CKsKAMmv_-mpM/exec";
    break;
}

function Images(width,height){
  fetch(GAS,
    {
      method: 'POST',
      body: ""
    }
  )
  .then(res => res.json())
  .then(result => {
    Image_urls = [];
    ImageDATAS = result;
    for (var i = 0; i < ImageDATAS.length; i++){
      Image_urls[i] = ImageDATAS[i].url;
    }
    vue1(width,height);
  },);
}

function vue1(width,height){
      fetch(GAS,
        {
          method: 'POST',
          body: "1"
        }
      )
      .then(res => res.json())
      .then(result => {
        DATAS = result;
        vue2(width,height);
      },);
}

function vue2(width,height,DATAS){
      fetch(GAS,
        {
          method: 'POST',
          body: "22"
        }
      )
      .then(res => res.json())
      .then(result => {
        kousin1 = result[0].更新日;
        vue3(width,height);
      },);
}

function vue3(width,height,DATAS,kousin1){
      fetch(GAS,
        {
          method: 'POST',
          body: "333"
        }
      )
      .then(res => res.json())
      .then(result => {
        BGM_urls = [];
        BGMDATAS = result;
        for (var i = 0; i < BGMDATAS.length; i++){
          BGM_urls[i] = BGMDATAS[i].url;
        }
        Load(width,height);
      },);
}

function vue(width,height){
      fetch(GAS,
        {
          method: 'POST',
          body: "メインシーン"
        }
      )
      .then(res => res.json())
      .then(result => {
        Vues[Fetchs][1] = result;
        Load(width,height,DATAS);
      },);
}

function vue(width,height){
      fetch(GAS,
        {
          method: 'POST',
          body: "メインシーン"
        }
      )
      .then(res => res.json())
      .then(result => {
        Vues[Fetchs][1] = result;
        Load(width,height,DATAS);
      },);
}

var Button_time_next = 3;
var Button_time = Button_time_next;

function Load(width,height){
  var game = new Core(width, height);

  var loadScene = new Scene();
	game.loadingScene = loadScene;

  var label = new Label();
  var progress = 0;

  var Texts = Class.create(Label, {
    initialize: function(a,b) {
      Label.call(this);
      this.font  = "30px monospace";
      this.color = 'black';
      this.x = 10;
      this.y = 100 + 40*b;
      this.width = width;
      this.height = 30;
      this.text = a;
      loadScene.addChild(this);
    }
  });

  var kousin2 = kousin1+"↓"+Version;
  var kousin3 = kousin2.split("↓")
  for (var i = 0; i < kousin3.length; i++) {
    new Texts(kousin3[i],i);
  }

	loadScene.addEventListener('progress', function(e){

    label.moveTo(100,290);
    label.color = 'Black';
    label.font  = "30px monospace";
    loadScene.addChild(label);

		progress = e.loaded / e.total;
		progress *= 100;
		progress = Math.round(progress);
    if(progress<10) progress = "00" + progress;
    else if(progress<100) progress = "0" + progress;
    label.text = "LOADING..." + progress + "％";

	});
	loadScene.addEventListener('load', function(e) {
    var Buttons = new Entity();
    Buttons.moveTo(100,330);
    Buttons.width = (width/2);
    Buttons.height = (width/5);
    Buttons._element = document.createElement('input');
    Buttons._element.type = "submit";
    Buttons._element.value = "始める";
    loadScene.addChild(Buttons);
    Buttons.addEventListener('touchstart',function(){
      var core = enchant.Core.instance;
      core.removeScene(core.loadingScene);
      core.dispatchEvent(e);
    });
	});
  game.preload("image/融合.png");
  game.preload("sound/Item.wav");
  game.preload("sound/セーブ.wav");
  game.preload("sound/音量調整用.wav");
  game.preload("sound/お任せなのだ.wav");
  game.preload("image/left.png");
  game.preload("image/right.png");
  game.preload("image/white.png");
  game.preload("image/stand.png");
  game.preload("image/ユベル.png");
  game.preload("image/留置所.png");
  game.preload("image/裁判長席.png");
  game.preload("image/背景/留置所背景.png");
  game.preload("sound/進む.wav");
  game.preload("image/Buttons.png");
  game.preload("image/待った！.png");
  game.preload("sound/待った！.wav");
  game.preload("sound/ア.wav");
  game.preload("sound/イ.wav");
  game.preload("sound/ウ.wav");
  game.preload("sound/エ.wav");
  game.preload("sound/オ.wav");
  game.preload("sound/カ.wav");
  game.preload("sound/キ.wav");
  game.preload("sound/ク.wav");
  game.preload("sound/ケ.wav");
  game.preload("sound/コ.wav");
  game.preload("sound/サ.wav");
  game.preload("sound/シ.wav");
  game.preload("sound/ス.wav");
  game.preload("sound/セ.wav");
  game.preload("sound/ソ.wav");
  game.preload("sound/タ.wav");
  game.preload("sound/チ.wav");
  game.preload("sound/ツ.wav");
  game.preload("sound/テ.wav");
  game.preload("sound/ト.wav");
  game.preload("sound/ナ.wav");
  game.preload("sound/ニ.wav");
  game.preload("sound/ヌ.wav");
  game.preload("sound/ネ.wav");
  game.preload("sound/ノ.wav");
  game.preload("sound/ハ.wav");
  game.preload("sound/ヒ.wav");
  game.preload("sound/フ.wav");
  game.preload("sound/ヘ.wav");
  game.preload("sound/ホ.wav");
  game.preload("sound/マ.wav");
  game.preload("sound/ミ.wav");
  game.preload("sound/ム.wav");
  game.preload("sound/メ.wav");
  game.preload("sound/モ.wav");
  game.preload("sound/ヤ.wav");
  game.preload("sound/ユ.wav");
  game.preload("sound/ヨ.wav");
  game.preload("sound/ラ.wav");
  game.preload("sound/ラ.wav");
  game.preload("sound/リ.wav");
  game.preload("sound/ル.wav");
  game.preload("sound/レ.wav");
  game.preload("sound/ロ.wav");
  game.preload("sound/ワ.wav");
  game.preload("sound/ヲ.wav");
  game.preload("sound/ン.wav");
  game.preload("sound/ポ.wav");
  game.preload("sound/メニュー.wav");
  game.preload("sound/メニュー移動.wav");
  game.preload("sound/アイテム表示音.wav");
  game.preload("sound/戻る.wav");
  game.preload("sound/選択音.wav");
  game.preload("sound/Trophy.wav");
  game.preload("image/Trophy.png");
  game.preload("image/異議あり！.png");
  game.preload("sound/異議あり！.wav");
  game.preload("image/カットイン.png");
  game.preload("image/Explosion.png");
  game.preload("image/背景/Black.png");
  game.preload("image/背景/left.png");
  game.preload("image/背景/right.png");
  game.preload("image/背景/stand.png");
  game.preload("image/背景/裁判長席.png");
  game.preload("image/背景/透明.png");
  game.preload("image/背景/留置所.png");
  game.preload("image/Background.png");
  game.preload("image/Set_button.png","image/stone.png","image/Hand.png","image/V_or_D.png");
  game.preload(Image_urls);
  game.preload(BGM_urls);

  game.fps = 10;
  game.onload = function(){

  	game.addEventListener("enterframe", function(){
      if(Button_time==Button_time_next) return;
      else Button_time++;
      return;
    });

    var XXX = width;
    var YYY = width/16*9;
    var Rotation_Y = 0;
    var Cut_in_time = 0;
    var Syougen_time = 0;
    var Syougen_time2 = 1;

    function Button_push(expression){
      if(Button_time==Button_time_next){
        Button_time = 0;
        switch (expression) {
          case "音無し":
            break;
          default:
            Sound_ON(expression,true);
            break;
        }
        return(false);
      }
      else return(true);
    }

    function conversion_url(name,Type){
      switch (Type) {
        case "画像":
          for (var i = 0; i < ImageDATAS.length; i++) {
            if(ImageDATAS[i].名前==name) return(ImageDATAS[i].url);
          }
          break;
        case "BGM":
          for (var i = 0; i < BGMDATAS.length; i++) {
            if(BGMDATAS[i].名前==name) return(BGMDATAS[i].url);
          }
          break;
      }
      return(name);
    }

    function Sound_ON(Sound_Name,Play){
      switch (Sound_Name) {
        case "異議あり！":
        case "待った！":
        case "お任せなのだ":
        case "音量調整用":
          if(Setting_Flag[11]==0) Play = false;
          else var Volume = Setting_Flag[11]/10;
          break;
        default:
          if(Setting_Flag[10]==0) Play = false;
          else var Volume = Setting_Flag[10]/10;
          break;
      }
      if(Play&&Sound_Name!="ポ") console.log(Sound_Name);
      if(Play){
        if(game.assets["sound/"+Sound_Name+".wav"].src==undefined){
          game.assets["sound/"+Sound_Name+".wav"].volume = Volume;
        }
        else{
          game.assets["sound/"+Sound_Name+".wav"]._value = Volume;
        }
        game.assets["sound/"+Sound_Name+".wav"].play();
      }
      else{
        game.assets["sound/"+Sound_Name+".wav"].play();
        game.assets["sound/"+Sound_Name+".wav"].stop();
      }
      return;
    }

    function post(a,b,c){
      return;
      var form = document.createElement('form');
      var input = [];
      var inputs1 = ["苗字","名前","シーンナンバー"];
      var inputs2 = [Setting_Flag[1],Setting_Flag[0],Number];
      for (var i = 0; i < inputs2.length; i++){
        input[i] = document.createElement('input');
        input[i].type = 'hidden'; //入力フォームが表示されないように
        input[i].name = inputs1[i];
        input[i].value = inputs2[i];
        form.appendChild(input[i]);
      }
      form.method = 'POST';
      form.target="_blank";
      form.name = "myform"
      form.action = GAS[1];
      document.body.appendChild(form);
      document.myform.submit();
      return;
    }

    function Scene_loads(Number,Return,Item){
      if(Number=="リバーシ") return;
      if(Number=="セーブ読み込み") Scene_type = Number;
      else Scene_loads2(Number,Item);
      switch (Scene_type) {
        case "直前":
          Scene_loads(Setting_Flag[4],false,false);
          break;
        case "読み込みエラー":
        case "メイン":
          game.replaceScene(MainScene(Return));
          break;
        case "アイテム":
          game.replaceScene(MainScene(false));
          break;
          case "移動":
            game.pushScene(MoveScene(10));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            break;
        case "フェードイン":
          Scene_loads(Moves,false,false);
          game.pushScene(MoveScene(-10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
          break;
        case "調べる":
          if(Number.length>5){
            if(Number.substring(0,6)=="アイテム使用"){
              Number = Number.substring(6).split(",");
              Setting_Flag[4] = Number[1];
              if(Setting_Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Setting_Flag[4] = Setting_Flag[4]*1;
              Number = Number[0];
              Inspect_loads(Number,false);
              return;
            }
          }
          Inspect_loads(Setting_Flag[4],false);
          break;
        case "チョイス":
          game.replaceScene(ChoiceScene());
          break;
        case "尋問":
          game.replaceScene(InterrogationScene());
          break;
        case "タイトルに戻る":
          game.replaceScene(TitleScene());
          break;
        case "セーブ読み込み":
          Moves = Load_Datas();
          game.pushScene(MoveScene(10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
          break;
        case "異議あり！":
        game.pushScene(PopScene(Datas[0],"異議あり！"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
          break;
          case "待った！":
          game.pushScene(PopScene(Datas[0],"待った！"));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
            break;
        default:
          if(Scene_type.length==3){
            game.pushScene(ItemgetScene(Scene_type[0],Scene_type[1],Scene_type[2]));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            return;
          }
          else{
            console.log("エラー");
          }
          break;
      }
    }

    function Inspect_loads(Number,Item){
      if(Item) game.replaceScene(InspectScene(Inspect_loads2("アイテム使用"+Item+","+Number),false));
      else game.replaceScene(InspectScene(Inspect_loads2(Number),false));
      return;
    }

    function Load_Datas(){
      Flag = window.localStorage.getItem("Flag").split(",");
      Setting_Flag = window.localStorage.getItem("Setting_Flag").split(",");
      Datas = window.localStorage.getItem("Datas").split(",");
      Number = window.localStorage.getItem("Number");
      if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1;
      Item_Flag = window.localStorage.getItem("Item").split("端");
      Trophy_Flag = window.localStorage.getItem("Trophy").split("端");
      Character_Flag = window.localStorage.getItem("Character").split("端");
      for (var i = 0; i < Item_Flag.length; i++){
        Item_Flag[i] = Item_Flag[i].split(",");
      }
      for (var i = 1; i < Item_Flag.length; i++){
        var Item_Flag2 = [];
        for (var k = 1; k < Item_Flag[i].length; k++){
          Item_Flag2[k-1] = Item_Flag[i][k];
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
        }
        Character_Flag[i] = Character_Flag2;
      }
      for (var i = 0; i < Character_Flag.length-1; i++) {
        Character_Flag2[i] = Character_Flag[i];
      }
      Character_Flag = Character_Flag2;
      if(Character_Flag == undefined) Character_Flag = [];
      for (var i = 0; i < Trophy_Flag.length; i++){
        Trophy_Flag[i] = Trophy_Flag[i].split(",");
      }
      for (var i = 1; i < Trophy_Flag.length; i++){
        var Trophy_Flag2 = [];
        for (var k = 1; k < Trophy_Flag[i].length; k++){
          Trophy_Flag2[k-1] = Trophy_Flag[i][k];
        }
        Trophy_Flag[i] = Trophy_Flag2;
      }
      for (var i = 0; i < Trophy_Flag.length-1; i++) {
        Trophy_Flag2[i] = Trophy_Flag[i];
      }
      Trophy_Flag = Trophy_Flag2;
      if(Trophy_Flag == undefined) Trophy_Flag = [];
      for (var i = 3; i < Setting_Flag.length; i++){
        if(Setting_Flag[i]=="true") Setting_Flag[i] = true;
        else if(Setting_Flag[i]=="false") Setting_Flag[i] = false
        else if(Setting_Flag[i].replace(/\d/g,"").replace(/\./g,"")=="") Setting_Flag[i] = Setting_Flag[i]*1;
        //[0名前,1苗字,2性別,3体力,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量];
      }
      for (var i = 0; i < Datas.length; i++){
        if(Datas[i].replace(/\d/g,"").replace(/\./g,"")=="") Datas[i] = Datas[i]*1;
      }
      return(Number);
    }

    var Datas = [];
    var Setting_Flag = ["名前","苗字","未設定",10,"最初から",0,0,0,true,5,5,5];
    //[0名前,1苗字,2性別,3体力,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量];
    var Flag = [];//フラグ
    var Item_Flag = [];//所持アイテム
    var Character_Flag = [];//人物
    var Trophy_Flag = [];//トロフィー
    var Scene_type = "メイン";
    var Scene_kazu = 1;
    var Get = false;
    var Moves = 0;
    var OASOBI = false;

    function have(Item){
    for (var i = 0; i < Item_Flag.length; i++) {
    if(Item_Flag[i][0]==Item) return(true);
    }
    for (var i = 0; i < Trophy_Flag.length; i++) {
    if(Trophy_Flag[i][0]==Item) return(true);
    }
    for (var i = 0; i < Flag.length; i++) {
    if(Flag[i]==Item) return(true);
    }
    return(false);
    }

    function Move(Number,fade){
      Moves = Number;
      Scene_type = "移動";
      if(fade) Scene_type = "フェードイン";
    }

    function Save(Number){
    window.localStorage.setItem("Flag",Flag);
    window.localStorage.setItem("Datas",Datas);
    window.localStorage.setItem("Number",Number);
    window.localStorage.setItem("Version",Version);
    window.localStorage.setItem("Setting_Flag",Setting_Flag);
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
    var Trophy_Flag2 = [];
    for (var i = 0; i < Trophy_Flag.length; i++) {
    Trophy_Flag2[i] = Trophy_Flag[i] + "端";
    }
    if(Trophy_Flag2==[]) Trophy_Flag2 = [[]+"端"]
    window.localStorage.setItem("Trophy",Trophy_Flag2);
    window.localStorage.setItem("syoken",false);
    console.log(Datas);
    post(Setting_Flag[1],Setting_Flag[0],Number);
    }//セーブ

    function rand(n) {
    return Math.floor(Math.random() * (n + 1));
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
    else Character_Flag[i] = [a,b,c,d,e];
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
    var Name = Setting_Flag[0];
    var Gender = Setting_Flag[2];
    var Surname = Setting_Flag[1];
    if(Gender=="男"){
    var www = ["僕","俺"];
    var Person = www[rand(1)];
    var S_image = conversion_url("男主人公","画像");
    if(Setting_Flag[1]=="不動"&&Setting_Flag[0]=="遊星"){
      var Person = "俺";
      var S_image = conversion_url("蟹","画像");
    }
    }
    else if(Gender=="女"){
    var Person = "私";
    var S_image = conversion_url("女主人公","画像");
    }
    else{
    var Person = "我";
    var S_image = "image/ユベル.png";
    }
    if(Item){
    Number = Item+Number;
    console.log(Number);
    Scene_loads2(Number,false,false);
    Scene_type = "アイテム";
    return;
    }
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
      Datas[0] = "Black";
      Datas[1] = 0;
      Datas[2] = 0;
      Datas[3] = 0;
      Datas[4] = 0;
      Datas[5] = 0;
      Datas[6] = 0;
      Datas[7] = "";
      Datas[8] = "データが存在しないようだ。";
      Datas[9] = 0;
      Datas[10] = 0;
      Datas[11] = Number;
      Datas[12] = "調べる";
      Datas[13] = 0;
      Scene_type = "メイン";
      return;
    }
    if(Number=="調べる何もない"){
      Datas[1] = 0;
      Datas[2] = 0;
      Datas[3] = 0;
      Datas[4] = 0;
      Datas[5] = 0;
      Datas[6] = 0;
      Datas[7] = "";
      Datas[8] = "特に気になるものはない。";
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
    if(Setting_Flag[8]) Datas[9] = 0;
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
    if(Number.length>10){
      if(Number.substring(0,10)=="つきつけるデフォルト"){
        if(Scene_type == "メイン"||Scene_type == "アイテム"){
        Datas = [Datas[0],Datas[2],0,Datas[4],0,Datas[6],0,"","反応がない。",0,0,0,Setting_Flag[4],0];
        }
        if(Scene_type == "チョイス"){
        Datas = [Datas[0],Datas[1],0,Datas[2],0,Datas[3],0,"","反応がない。",0,0,0,Setting_Flag[4],0];
        }
        Scene_type = "メイン";
        return;
      }
    }
    if(Number.length>7){
      if(Number.substring(0,7)=="使うデフォルト"){
        if(Scene_type == "メイン"||Scene_type == "アイテム"){
        Datas = [Datas[0],Datas[1],0,Datas[3],0,Datas[5],0,"","ここでは使えないようだ。",0,0,0,Setting_Flag[4],0];
        }
        if(Scene_type == "チョイス"){
        Datas = [Datas[0],Datas[1],0,Datas[2],0,Datas[3],0,"","ここでは使えないようだ。",0,0,0,Setting_Flag[4],0];
        }
        Scene_type = "メイン";
        return;
      }
    }
    if(Number.length>5){
      if(Number.substring(0,5)=="つきつける"){
        Scene_loads2(Setting_Flag[4],"つきつけるデフォルト",false);
        return;
      }
    }
    if(Number.length>2){
      if(Number.substring(0,2)=="使う"){
        Scene_loads2(Setting_Flag[4],"使うデフォルト",false);
        return;
      }
    }
    if(Setting_Flag[4]) Datas = ["Black",0,0,0,0,0,0,"","ここから先はできていません。↓ ↓" + kousin2,0,0,0,"未完成",0];
    else Datas = ["Black",0,0,0,0,0,0,"","ここから先はできていません。↓ ↓" + kousin2,0,0,0,"タイトルに戻る",0];
    Scene_type = "メイン";
    return;
    }
    if(DATAS[i].BGM!="変化無し"){
      for (var k = 0; k < BGMDATAS.length; k++){
        if(DATAS[i].BGM!=BGMDATAS[k].名前&&game.assets[BGMDATAS[k].url].状態=="再生中"){
          game.assets[BGMDATAS[k].url].stop();
          game.assets[BGMDATAS[k].url].状態 = "停止";
        }
      }
      if(DATAS[i].BGM!=false&&game.assets[conversion_url(DATAS[i].BGM,"BGM")].状態!="再生中"){
        game.assets[conversion_url(DATAS[i].BGM,"BGM")].状態 = "再生中";
        if(game.assets[conversion_url(DATAS[i].BGM,"BGM")].src==undefined){
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].volume = Setting_Flag[9]/10;
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].play();
          game.assets[conversion_url(DATAS[i].BGM,"BGM")]._element.loop = true;
          console.log(game.assets[conversion_url(DATAS[i].BGM,"BGM")]);
        }
        else{
          for (var k = 0; k < BGMDATAS.length; k++){
            if(BGMDATAS[k].名前==DATAS[i].BGM) break;
          }
          game.assets[conversion_url(DATAS[i].BGM,"BGM")]._volume = Setting_Flag[9]/10;
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].play();
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].src.loop = true;
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].src.loopStart = BGMDATAS[k].ループ開始;
          game.assets[conversion_url(DATAS[i].BGM,"BGM")].src.loopEnd = BGMDATAS[k].ループ終了;
          console.log(game.assets[conversion_url(DATAS[i].BGM,"BGM")]);
        }
        if(Setting_Flag[9]==0)game.assets[conversion_url(DATAS[i].BGM,"BGM")].stop();
      }
    }
    if(Scene_type=="メイン"){
      Datas[0] = conversion_url(DATAS[i].Datas0,"画像");
      Datas[1] = conversion_url(DATAS[i].Datas1,"画像");
      Datas[2] = DATAS[i].Datas2;
      Datas[3] = conversion_url(DATAS[i].Datas3,"画像");
      Datas[4] = DATAS[i].Datas4;
      Datas[5] = conversion_url(DATAS[i].Datas5,"画像");
      Datas[6] = DATAS[i].Datas6;
      Datas[7] = DATAS[i].Datas7.replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/,Name);
      Datas[8] = DATAS[i].Datas8.replace(/\n/g,"↓").replace(/\(主人公苗字\)/g,Surname).replace(/\(主人公名前\)/g,Name).replace(/\(一人称\)/g,Person).replace(/\(残りライフ\)/g,Setting_Flag[3]);
      Datas[9] = DATAS[i].Datas9;
      Datas[10] = DATAS[i].Datas10;
      Datas[11] = DATAS[i].Datas11;
      Datas[12] = DATAS[i].Datas12;
      Datas[13] = DATAS[i].Datas13;
      Datas[14] = DATAS[i].Datas14;
      Datas[15] = conversion_url(DATAS[i].Datas15,"画像");
      Datas[16] = DATAS[i].トロフィー;
      Datas[17] = DATAS[i].トロフィー画像;
      Datas[18] = DATAS[i].トロフィー内容.replace(/\n/g,"↓");
      if(Datas[1]=="主人公") Datas[1] = S_image;
      if(Datas[3]=="主人公") Datas[3] = S_image;
      if(Datas[5]=="主人公") Datas[5] = S_image;
    }
    else if(Scene_type=="チョイス"){
      Datas[0] = conversion_url(DATAS[i].Datas0,"画像");
      Datas[1] = conversion_url(DATAS[i].Datas1,"画像");
      Datas[2] = conversion_url(DATAS[i].Datas2,"画像");
      Datas[3] = conversion_url(DATAS[i].Datas3,"画像");
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
      Datas[16] = "";
      Datas[17] = "";
      Datas[18] = "";
      if(Datas[1]=="主人公") Datas[1] = S_image;
      if(Datas[2]=="主人公") Datas[2] = S_image;
      if(Datas[3]=="主人公") Datas[3] = S_image;
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
      if(Setting_Flag[3]==0){
        Number = "ライフ0_1";
      }
      else {
        Number = Setting_Flag[4];
      }
      Scene_loads2(Number,false,false);
    }
    else if (Scene_type=="移動") {
      Move(DATAS[i].Datas0);
    }
    else if (Scene_type=="尋問") {
      Datas = [conversion_url(DATAS[i].Datas0,"画像"),DATAS[i].Datas1,DATAS[i].Datas2,DATAS[i].Datas3,DATAS[i].Datas4,DATAS[i].Datas5,DATAS[i].Datas6,DATAS[i].Datas7,DATAS[i].Datas8];
    }
    else if(Scene_type=="アイテムゲット"){
      Scene_type = [conversion_url(DATAS[i].Datas0,"画像"),DATAS[i].Datas1,DATAS[i].Datas2];
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
              Flag = [];
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
            Setting_Flag[3]--;
            continue;
              break;
            default:
            console.log(GET[l]);
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
    Setting_Flag[4] = Number;
    if(Number.length>5){
    if(Number.substring(0,6)=="アイテム使用"){
    Number = Number.substring(6).split(",");
    if(Setting_Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Setting_Flag[4] = Setting_Flag[4]*1;
    Number = Number[0];
    }
    }
    break;
    }
    var Inspect = ["背景ナンバー","(幅,高さ,x座標,y座標,シーンナンバー)"];
    for (var i = 0; i < DATAS.length; i++) {
      if(DATAS[i].Number=="調べる"+Number){
        Inspect = [conversion_url(DATAS[i].type,"画像"),DATAS[i].Datas0,DATAS[i].Datas1,DATAS[i].Datas2,DATAS[i].Datas3,DATAS[i].Datas4,DATAS[i].Datas5,DATAS[i].Datas6,DATAS[i].Datas7,DATAS[i].Datas8,DATAS[i].Datas9,DATAS[i].Datas10,DATAS[i].Datas11,DATAS[i].Datas12,DATAS[i].Datas13,DATAS[i].Datas14];
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
    Scene_loads2(Setting_Flag[4],false,true);
    Get = false;
    return;
    }

    var TitleScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る
      if(window.localStorage.getItem("syoken")!="false"){
        var Data = false;
      }
      else{
        if(window.localStorage.getItem("Version")==Version){
          var Version_new = true;
        }
        else var Version_new = false;
        var Data = true;
      }

      var xxx = game.assets[conversion_url("タイトル画面","画像")].width;
      var yyy = game.assets[conversion_url("タイトル画面","画像")].height;
      var Title = new Sprite(xxx,yyy);
      Title.image = game.assets[conversion_url("タイトル画面","画像")];
      Title.scaleX = width/xxx;
      Title.scaleY = width/16*9/yyy;
      Title.x = (Title.scaleX*xxx/2)-xxx/2;
      Title.y = (Title.scaleY*yyy/2)-yyy/2;
      scene.addChild(Title);

      var Button = [];
      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        if(a=="データ初期化"){
          Button[submits].moveTo(width/4,0);
        }
        else{
          Button[submits].moveTo(width/4,Numbers);
          Numbers += (width/20)+(width/25)+(width/25);
        }
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "データ初期化":
              var ooo = "音無し";
              break;
            default:
              var ooo ="選択音";
              break;
          }
          if(Button_push(ooo)) return;
          if(a!="データ初期化"&&a!="データ初期化(推奨)"&&Data) Load_Datas();
          switch (a) {
            case "続きから":
              Scene_loads("セーブ読み込み",false,false);
              break;
              case "データ初期化":
              case "データ初期化(推奨)":
              game.pushScene(ClearScene());
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            default:
              Scene_loads(a,false,false);
              break;
          }
        });
        submits++;
      }

      Submit("最初から");
      if(Data){
        if(Version_new) Submit("データ初期化");
        else Submit("データ初期化(推奨)")
        Submit("続きから");
      }
      Submit("説明");

      if(Version_new){
        Setting_Flag = window.localStorage.getItem("Setting_Flag").split(",");
        if(Setting_Flag[1]=="不動"&&Setting_Flag[0]=="遊星"&&Setting_Flag[2]=="男") Submit("テスト用");
        else {
          fetch(GAS[1],
            {
              method: 'POST',
              body: GitHub_type
            }
          )
        }
      }
      else{
        fetch(GAS[1],
          {
            method: 'POST',
            body: GitHub_type
          }
        )
      }

      Title.addEventListener("enterframe",function(){
        if(game.input.up){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
      })

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 455;
      Set_button.frame = 15;
      scene.addChild(Set_button);
      Set_button.addEventListener('touchstart',function(e){
        game.pushScene(ReversiScene());
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
        if(OK) Setting_Flag[4] = Datas[11];
        if(Setting_Flag[8]){
          Save(Datas[11]);
        }
      }

      switch (Datas[0]) {
        case "ヒント":
          var xxx = game.assets["image/融合.png"].width;
          var yyy = game.assets["image/融合.png"].height;
          var Background = new Sprite(xxx,yyy);
          Background.image = game.assets["image/融合.png"];
          Background.scaleX = width/xxx*1.2;
          Background.scaleY = width/yyy*1.2;
          Background.x = (width-xxx)/2;
          Background.y = -(width-xxx)/2;
          Rotation_Y -= 10;
          Background.rotation = Rotation_Y;
          scene.addChild(Background);//背景
          var Background2 = new Sprite(width,height);
          Background2.image = game.assets["image/white.png"];
          Background2.x = 0;
          Background2.y = (width/16)*9;
          scene.addChild(Background2);//白地
          Background.addEventListener("enterframe",function(){
            Rotation_Y -= 10;
            Background.rotation = Rotation_Y;
            if(Rotation_Y==-360) Rotation_Y = 0;
          })
          break;
          case "Black":
          case "left":
          case "right":
          case "stand":
          case "留置所":
          case "裁判長席":
          var xxx = game.assets["image/背景/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/背景/"+Datas[0]+".png"].height;
          var Background = new Sprite(xxx,yyy);
          Background.scaleX = ((width)/xxx);
          Background.scaleY = (((width/16)*9)/yyy);
          Background.image = game.assets["image/背景/"+Datas[0]+".png"];
          Background.x = (Background.scaleX*xxx/2)-xxx/2;
          Background.y = (Background.scaleY*yyy/2)-yyy/2;
          scene.addChild(Background);
          break;
        case "カットイン":
          break;
        default:
          var xxx = game.assets[Datas[0]].width;
          var yyy = game.assets[Datas[0]].height;
          var Background = new Sprite(xxx,yyy);
          Background.scaleX = ((width)/xxx);
          Background.scaleY = (((width/16)*9)/yyy);
          Background.image = game.assets[Datas[0]];
          Background.x = (Background.scaleX*xxx/2)-xxx/2;
          Background.y = (Background.scaleY*yyy/2)-yyy/2;
          scene.addChild(Background);
          break;
      }

      if(Datas[0]=="カットイン"){
        var ccx = game.assets["image/カットイン.png"].width*3;
        var ccy = game.assets["image/カットイン.png"].height;
        var Cut_in = new Sprite(ccx,ccy);
        Cut_in.scaleX = width/ccx*3;
        Cut_in.scaleY = width/16*9/ccy;
        Cut_in.image = game.assets["image/カットイン.png"];
        Cut_in_time += 10;
        Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2-Cut_in_time;
        Cut_in.y = (Cut_in.scaleY*ccy/2)-ccy/2;
        scene.addChild(Cut_in);//背景
        Cut_in.addEventListener("enterframe",function(){
          Cut_in_time += 10;
          Cut_in.x -= 10;
          if(Cut_in_time>width*2){
            Cut_in_time = 0;
            Cut_in.x = (Cut_in.scaleX*ccx/2)-ccx/2;
          }
        })
      }

      var xxx = 80;
      var yyy = 80;
      var Explosion = new Sprite(xxx,yyy);
      Explosion.scaleX = ((width/2)/xxx);
      Explosion.scaleY = (((width/16)*9)/yyy);
      Explosion.image = game.assets["image/Explosion.png"];
      Explosion.frame = 11;
      Explosion.y = (Explosion.scaleY*yyy/2)-yyy/2;
      scene.addChild(Explosion);
      Explosion.addEventListener("enterframe",function(){
        if(Explosion.frame!=11) Explosion.frame++;
      })

      if(Datas[3]!=false){
        var xxx = game.assets[Datas[3]].width;
        var yyy = game.assets[Datas[3]].height;
        var Character2 = new Sprite(xxx,yyy);
        Character2.scaleX = ((width/2)/xxx);
        Character2.scaleY = ((width/2)/yyy);
        Character2.image = game.assets[Datas[3]];
        if(Datas[0]=="カットイン"){
          Character2.scaleX *= 2;
          Character2.scaleY *= 2;
          Character2.x = (Character2.scaleX*xxx/2)-xxx/2;
          Character2.y = (Character2.scaleY*yyy/2)-yyy/2;
        }
        else {
          Character2.x = (Character2.scaleX*xxx/2)-xxx/2+(width/4);
          Character2.y = (Character2.scaleY*yyy/2)-yyy/2+(width/16);
        }
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
        case "裁判長席":
          var xxx = game.assets["image/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/"+Datas[0]+".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = game.assets["image/"+Datas[0]+".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var xxx = game.assets[Datas[1]].width;
        var yyy = game.assets[Datas[1]].height;
        var Character1 = new Sprite(xxx,yyy);
        Character1.scaleX = ((width/2)/xxx);
        Character1.scaleY = ((width/2)/yyy);
        Character1.image = game.assets[Datas[1]];
        if(Datas[0]=="カットイン"){
          Character1.scaleX *= 2;
          Character1.scaleY *= 2;
          Character1.x = (Character1.scaleX*xxx/2)-xxx/2-(width/4);
          Character1.y = (Character1.scaleY*yyy/2)-yyy/2;
        }
        else {
          Character1.x = (Character1.scaleX*xxx/2)-xxx/2;
          Character1.y = (Character1.scaleY*yyy/2)-yyy/2+(width/16);
        }
        if(Datas[2]!=0){
          if(Datas[2]=="点滅"){
            Character1.opacity = Syougen_time;
            if(Syougen_time<=0){
              Character1.opacity = 0;
              Syougen_time2 = 1;
            }
            scene.addChild(Character1);
            Character1.addEventListener("enterframe",function(){
              Syougen_time += 0.1 * Syougen_time2;
              Character1.opacity = Syougen_time;
              if(Syougen_time>=1) Syougen_time2 = -1;
              if(Syougen_time<=0){
                Character1.opacity = 0;
                Syougen_time2 = 1;
              }
            })
          }
          else if(Datas[2]>0){
            Syougen_time = 0;
            Syougen_time2 = 1;
            if(Return!=true){
              Character1.opacity = 0;
              Character1.tl.fadeIn(Datas[2]);
            }
          }
          else{
            Syougen_time = 0;
            Syougen_time2 = 1;
            if(Return!=true){
              Character1.tl.fadeOut(Datas[2]*-1);
            }
            else Character1.opacity = 0;
          }
        }
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[5]!=false){
        var xxx = game.assets[Datas[5]].width;
        var yyy = game.assets[Datas[5]].height;
        var Character3 = new Sprite(xxx,yyy);
        Character3.scaleX = ((width/2)/xxx);
        Character3.scaleY = ((width/2)/yyy);
        Character3.image = game.assets[Datas[5]];
        if(Datas[0]=="カットイン"){
          Character3.scaleX *= 2;
          Character3.scaleY *= 2;
          Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/4);
          Character3.y = (Character3.scaleY*yyy/2)-yyy/2;
        }
        else {
          Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/2);
          Character3.y = (Character3.scaleY*yyy/2)-yyy/2+(width/16);
        }
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
          var xxx = game.assets["image/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/"+Datas[0]+".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = game.assets["image/"+Datas[0]+".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[14]!=undefined&&Datas[14]!=false){
        var xxx = game.assets[Datas[15]].width;
        var yyy = game.assets[Datas[15]].height;
        var Item = new Sprite(xxx,yyy);
        Item.scaleX = ((width/4)/xxx);
        Item.scaleY = ((width/4)/yyy);
        Item.image = game.assets[Datas[15]];
        Item.x = ((Item.scaleX*xxx/2)-xxx/2)+Datas[14].substring(0,4)*(width/1600);
        Item.y = ((Item.scaleY*yyy/2)-yyy/2)+Datas[14].substring(5,9)*(width/16/100);
        if(Return!=true&&Datas[14].substring(11,12)*1!=0){
          Item.opacity = 0;
          Item.tl.fadeIn(Datas[14].substring(11,12)*1);
        }
        scene.addChild(Item);
      }//アイテム

      var Background2 = new Sprite(width,height);
      Background2.image = game.assets["image/white.png"];
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

      if(Moves=="空"){
        var xxx = game.assets[conversion_url("タクシー","画像")].width;
        var yyy = game.assets[conversion_url("タクシー","画像")].height;
        var Taxi = new Sprite(xxx,yyy);
        Taxi.scaleX = ((width/2)/xxx);
        Taxi.scaleY = ((width/2)/yyy);
        Taxi.image = game.assets[conversion_url("タクシー","画像")];
        var X_0 = (Taxi.scaleX*xxx/2)-xxx/2;
        var Y_0 = (Taxi.scaleY*yyy/2)-yyy/2;
        Taxi.x = X_0 + width/2 -width/4;
        Taxi.y = Y_0 + width/32;
        scene.addChild(Taxi);

        var S_Input1 = new Entity();
        S_Input1.moveTo((width/4),width/16*9+(width/20)+(width/25)+(width/25));
        S_Input1.width = width/2;
        S_Input1.height = (width/10);
        S_Input1._element = document.createElement("select");

        var Option = [];

        for (var i = 0; i < DATAS.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = DATAS[i].Number;
        Option[i].value = DATAS[i].Number;
        if(DATAS[i].type=="メイン"||DATAS[i].type=="チョイス"||DATAS[i].type=="尋問") S_Input1._element.appendChild(Option[i]);
        }
        scene.addChild(S_Input1);

        var Buttons = new Entity();
        Buttons.moveTo(width/4,width/16*9+(width/20)+(width/25)+(width/25)+(width/5));
        Buttons.width = width/2;
        Buttons.height = width/10;
        Buttons._element = document.createElement('input');
        Buttons._element.type = "submit";
        Buttons._element.value = "決定";
        scene.addChild(Buttons);
        Buttons.addEventListener('touchstart',function(e){
        Moves = S_Input1._element.value;
        game.pushScene(MoveScene(10));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        });
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
          this.width = width*2;
          this.height = (width/20);
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          scene.addChild(this);
        }
      });

      var Text =[];

      for (var i = 0; i < 6; i++) {
        Text[i] = new Texts("");
      }

      var Time = 0;
      var k = 0;
      var Text_defined = true;

      function T_D(){
        var s = true;
        if(Datas[8].substring(Time,Time+1)=="→"){
          s = false;
        }
        else if(Datas[8].substring(Time,Time+1)=="㊨"){
          s = false;
          if(Return==false){
            Explosion.x = (Explosion.scaleX*80/2)-80/2+(width/2);
            Explosion.frame = 0;
          }
        }
        else if(Datas[8].substring(Time,Time+1)=="㊥"){
          s = false;
          if(Return==false){
            Explosion.x = (Explosion.scaleX*80/2)-80/2+(width/4);
            Explosion.frame = 0;
          }
        }
        else if(Datas[8].substring(Time,Time+1)=="㊧"){
          s = false;
          if(Return==false){
            Explosion.x = (Explosion.scaleX*80/2)-80/2;
            Explosion.frame = 0;
          }
        }
        Time ++;
        if(s){
          if(Datas[8].substring(Time-1,Time)=="↓"){
            k++;
            if(Datas[8].substring(0,1)=="("){
              Text[k].color = "blue";
              Text[k].text = " ";
            }
            if(Datas[8].substring(0,1)=="("){
              Text[k].text = " ";
            }
            if(Datas[8].substring(0,1)=="「"){
              if(Datas[8].substring(Time-2,Time-1)!="」"){
                Text[k].text = "　";
              }
            }
          }
          else if(Datas[8].substring(Time-1,Time)!=""){
            if(Text[k].text.substring(0,1)=="("||Text[k].text.substring(0,1)==" ") Text[k].color = "blue";
            Text[k].text = Text[k].text+Datas[8].substring(Time-1,Time);
            if(Return==false){
              if(Datas[7]=="メカ"){
                switch(Text[k].text.substring(Text[k].text.length-1)){
                  case "ア":
                  case "イ":
                  case "ウ":
                  case "エ":
                  case "オ":
                  case "カ":
                  case "キ":
                  case "ク":
                  case "ケ":
                  case "コ":
                  case "サ":
                  case "シ":
                  case "ス":
                  case "セ":
                  case "ソ":
                  case "タ":
                  case "チ":
                  case "ツ":
                  case "テ":
                  case "ト":
                  case "ナ":
                  case "ニ":
                  case "ヌ":
                  case "ネ":
                  case "ノ":
                  case "ハ":
                  case "ヒ":
                  case "フ":
                  case "ヘ":
                  case "ホ":
                  case "マ":
                  case "ミ":
                  case "ム":
                  case "メ":
                  case "モ":
                  case "ヤ":
                  case "ユ":
                  case "ヨ":
                  case "ラ":
                  case "ラ":
                  case "リ":
                  case "ル":
                  case "レ":
                  case "ロ":
                  case "ワ":
                  case "ヲ":
                  case "ン":
                    Sound_ON(Text[k].text.substring(Text[k].text.length-1),true);
                    break;
                  default:
                    //Sound_ON("ポ",true);
                    break;
                }
              }
              else Sound_ON("ポ",true);
            }
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

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(b=="アイテム") var ooo = "メニュー";
          else var ooo = "進む";
          if(Button_push(ooo)) return;
          if(a==2){
            game.pushScene(ItemScene(c,false,"アイテム"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(a==3){
            if(Text_defined){
              Return = true;
              Text_defined = false;
              for (var i = 0; i < 6; i++) {
                Text[i].text = "";
              }
              Time = 0;
              k = 0;
              for (var i = 0; i < Datas[8].length+1; i++) {
                T_D();
              }
            }
            else Scene_loads(c,false,false);
          }
          else Scene_loads(c,true,false);
        });
      }
      if(Datas[9]!=false) Button(0,"◀ ◀",Datas[9]);//戻る1
      if(Datas[10]!=false) Button(1,"◀",Datas[10]);//戻る2
      if(Datas[11]!=false) Button(2,"アイテム",Datas[11]);//設定
      if(Datas[12]!=false) Button(3,"▶",Datas[12]);//進む1
      if(Datas[13]!=false) Button(4,"▶ ▶",Datas[13]);//進む2

      if(Datas[16]!=false&&Datas[16]!=undefined){
        if(have(Datas[16])==false){
          if(Datas[11]!=false){
            Trophy_Flag[Trophy_Flag.length] = [Datas[16],Datas[18],Datas[17]];
          }
          var Trophy_Time = 0;
          var xxx = game.assets["image/Trophy.png"].width;
          var yyy = game.assets["image/Trophy.png"].height;
          var Trophy = new Sprite(xxx,yyy);
          Trophy.image = game.assets["image/Trophy.png"];
          Trophy.scaleX = ((width/3.61)/xxx);
          Trophy.scaleY = (((width/14.15))/yyy);//ココが変換した場所
          Trophy.x = (Trophy.scaleX*xxx/2)-xxx/2+(width-(width/3.5));
          Trophy.y = (Trophy.scaleY*yyy/2)-yyy/2+(width/80);
          Trophy.opacity = 0;
          Trophy.tl.fadeIn(5);
          scene.addChild(Trophy);
          var xxx = game.assets[conversion_url(Datas[17],"画像")].width;
          var yyy = game.assets[conversion_url(Datas[17],"画像")].height;
          var Trophy_image = new Sprite(xxx,yyy);
          Trophy_image.image = game.assets[conversion_url(Datas[17],"画像")];
          Trophy_image.scaleX = ((width/18.82)/xxx);
          Trophy_image.scaleY = ((width/18.82)/yyy);
          Trophy_image.x = (Trophy_image.scaleX*xxx/2)-xxx/2+(width-(width/3.6));
          Trophy_image.y = (Trophy_image.scaleY*yyy/2)-yyy/2+(width/50);
          Trophy_image.opacity = 0;
          Trophy_image.tl.fadeIn(5);
          scene.addChild(Trophy_image);
          var Trophy_text = new Label();
          Trophy_text.font  = (width/40)+"px monospace";
          Trophy_text.color = 'white';
          Trophy_text.x = (width-(width/5));
          Trophy_text.y = (width/28)+(width/80);
          Trophy_text.width = width;
          Trophy_text.height = (width/40);
          Trophy_text.opacity = 0;
          Trophy_text.tl.fadeIn(5);
          Trophy_text.text = Datas[16];
          scene.addChild(Trophy_text);
          Sound_ON("Trophy",true);
          Trophy.addEventListener("enterframe",function(){
            Trophy_Time++;
            if(Trophy_Time==20){
              Trophy.tl.fadeOut(5);
              Trophy_image.tl.fadeOut(5);
              Trophy_text.tl.fadeOut(5);
            }
          })
        }
      }//トロフィー
      return scene;
    };
    var MoveScene = function(Out){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/背景/Black.png"].width;
      var yyy = game.assets["image/背景/Black.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = game.assets["image/背景/Black.png"];
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
      Background2.image = game.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = (width/16)*9;
      scene.addChild(Background2);//白地

      var Buttons = new Entity();
      Buttons.moveTo((width/5)*3,height-(width/5));
      Buttons.width = (width/5);
      Buttons.height = (width/5);
      Buttons._element = document.createElement('input');
      Buttons._element.type = "submit";
      Buttons._element.value = "▶";
      scene.addChild(Buttons);

      Buttons.addEventListener('touchstart',function(e){
        if(Button_push("進む")) return;
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Scene_loads(Moves,false,false);
      });

      Background.addEventListener("enterframe",function(){
        if(Background.opacity == 1 && Out>0){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(Moves,false,false);
          game.pushScene(MoveScene(-10));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        }
        if(Background.opacity == 0 && Out<0){
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
      })

      return scene;
    };
    var ChoiceScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var OK = true;
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
        if(OK) Setting_Flag[4] = Datas[6];
        if(Setting_Flag[8]&&Datas[6]!="ゲームオーバー"){
          Save(Datas[6]);
        }
      }


      switch (Datas[0]) {
        case "ヒント":
          var xxx = game.assets["image/融合.png"].width;
          var yyy = game.assets["image/融合.png"].height;
          var Background = new Sprite(xxx,yyy);
          Background.image = game.assets["image/融合.png"];
          Background.scaleX = width/xxx*1.2;
          Background.scaleY = width/yyy*1.2;
          Background.x = (width-xxx)/2;
          Background.y = -(width-xxx)/2;
          Rotation_Y -= 10;
          Background.rotation = Rotation_Y;
          scene.addChild(Background);//背景
          var Background2 = new Sprite(width,height);
          Background2.image = game.assets["image/white.png"];
          Background2.x = 0;
          Background2.y = (width/16)*9;
          scene.addChild(Background2);//白地
          Background.addEventListener("enterframe",function(){
            Rotation_Y -= 10;
            Background.rotation = Rotation_Y;
            if(Rotation_Y==-360) Rotation_Y = 0;
          })
          break;
          case "Black":
          case "left":
          case "right":
          case "stand":
          case "裁判長席":
          case "留置所":
          var xxx = game.assets["image/背景/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/背景/"+Datas[0]+".png"].height;
          var Background = new Sprite(xxx,yyy);
          Background.scaleX = ((width)/xxx);
          Background.scaleY = (((width/16)*9)/yyy);
          Background.image = game.assets["image/背景/"+Datas[0]+".png"];
          Background.x = (Background.scaleX*xxx/2)-xxx/2;
          Background.y = (Background.scaleY*yyy/2)-yyy/2;
          scene.addChild(Background);
          break;
        default:
          var xxx = game.assets[Datas[0]].width;
          var yyy = game.assets[Datas[0]].height;
          var Background = new Sprite(xxx,yyy);
          Background.scaleX = ((width)/xxx);
          Background.scaleY = (((width/16)*9)/yyy);
          Background.image = game.assets[Datas[0]];
          Background.x = (Background.scaleX*xxx/2)-xxx/2;
          Background.y = (Background.scaleY*yyy/2)-yyy/2;
          scene.addChild(Background);
          break;
      }

      if(Datas[2]!=false){
        var xxx = game.assets[Datas[2]].width;
        var yyy = game.assets[Datas[2]].height;
        var Character2 = new Sprite(xxx,yyy);
        Character2.scaleX = ((width/2)/xxx);
        Character2.scaleY = ((width/2)/yyy);
        Character2.image = game.assets[Datas[2]];
        Character2.x = (Character2.scaleX*xxx/2)-xxx/2+(width/4);
        Character2.y = (Character2.scaleY*yyy/2)-yyy/2+(width/16);
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "留置所":
          var xxx = game.assets["image/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/"+Datas[0]+".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = game.assets["image/"+Datas[0]+".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var xxx = game.assets[Datas[1]].width;
        var yyy = game.assets[Datas[1]].height;
        var Character1 = new Sprite(xxx,yyy);
        Character1.scaleX = ((width/2)/xxx);
        Character1.scaleY = ((width/2)/yyy);
        Character1.image = game.assets[Datas[1]];
        Character1.x = (Character1.scaleX*xxx/2)-xxx/2;
        Character1.y = (Character1.scaleY*yyy/2)-yyy/2+(width/16);
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var xxx = game.assets[Datas[3]].width;
        var yyy = game.assets[Datas[3]].height;
        var Character3 = new Sprite(xxx,yyy);
        Character3.scaleX = ((width/2)/xxx);
        Character3.scaleY = ((width/2)/yyy);
        Character3.image = game.assets[Datas[3]];
        Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/2);
        Character3.y = (Character3.scaleY*yyy/2)-yyy/2+(width/16);
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var xxx = game.assets["image/"+Datas[0]+".png"].width;
          var yyy = game.assets["image/"+Datas[0]+".png"].height;
          var Stand = new Sprite(xxx,yyy);
          Stand.scaleX = width/xxx;
          Stand.scaleY = width/16*9/yyy;
          Stand.image = game.assets["image/"+Datas[0]+".png"];
          Stand.x = (Stand.scaleX*xxx/2)-xxx/2;
          Stand.y = (Stand.scaleY*yyy/2)-yyy/2;
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a,b){
        Text[submits] = new Entity();
        Text[submits].moveTo(width/4,Numbers);
        Text[submits].width = width/2;
        Text[submits].height = (width/10);
        Text[submits]._element = document.createElement('input');
        Text[submits]._element.type = "submit";
        Text[submits]._element.value = a;
        if(a) scene.addChild(Text[submits]);
        if(have(a)){
          Text[submits]._element.value += " ✓";
          Text[submits].backgroundColor = "red";
        }
        Text[submits].addEventListener('touchstart',function(e){
          if(a=="戻る") var ooo = "戻る";
          else if(a == "つきつける") var ooo = "メニュー";
          else var ooo = "選択音";
          if(Button_push(ooo)) return;
          if(a == "調べる") Inspect_loads(Datas[6],false);
          else if (a == "つきつける"){
            game.pushScene(ItemScene(Datas[6],"日常","アイテム"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(b,false,false);
        });
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }

      var Text = [];
      for (var i = 7; i < Datas.length; i = i+2) {
        Submit(Datas[i],Datas[i+1]);
      }

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(b=="アイテム") var ooo = "メニュー";
          else var ooo = "進む";
          if(Button_push(ooo)) return;
          if(b=="アイテム"){
            game.pushScene(ItemScene(c,false,b));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(c,true,false);
        });
      }
      if(Datas[4]!=false) Button(0,"◀ ◀",Datas[4]);//戻る1
      if(Datas[5]!=false) Button(1,"◀",Datas[5]);//戻る2
      if(Datas[6]!=false&&Datas[6]!="ゲームオーバー") Button(2,"アイテム",Datas[6]);//設定

      return scene;
    };
    var PopScene = function(Number,Type){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/"+Type+".png"].width;
      var yyy = game.assets["image/"+Type+".png"].height;
      var Pop = new Sprite(xxx,yyy);
      Pop.image = game.assets["image/"+Type+".png"];
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
            game.popScene();
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

      if(Setting_Flag[8]&&Datas[5]!=false){
        Save(Datas[5]);
      }

      Setting_Flag[4] = Datas[5];

      var xxx = game.assets["image/背景/stand.png"].width;
      var yyy = game.assets["image/背景/stand.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = game.assets["image/背景/stand.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);//証言席

      var xxx = game.assets[Datas[0]].width;
      var yyy = game.assets[Datas[0]].height;
      var Character = new Sprite(xxx,yyy);
      Character.scaleX = ((width/2)/xxx);
      Character.scaleY = ((width/2)/yyy);
      Character.image = game.assets[Datas[0]];
      Character.x = (Character.scaleX*xxx/2)-xxx/2+(width/4);
      Character.y = (Character.scaleY*yyy/2)-yyy/2+(width/16);
      scene.addChild(Character);//キャラ

      var xxx = game.assets["image/stand.png"].width;
      var yyy = game.assets["image/stand.png"].height;
      var Stand = new Sprite(xxx,yyy);
      Stand.scaleX = width/xxx;
      Stand.scaleY = width/16*9/yyy;
      Stand.image = game.assets["image/stand.png"];
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
          this.width = width*2;
          this.height = (width/20);
          this.text = a;
          scene.addChild(this);
        }
      });

      var Text = Datas[2].split("↓");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      if(Text[0].text.substring(0,1)=="「"&&Text[i-1].text.substring(Text[i-1].text.length-1)=="」"){
        for (var i = 1; i < Text.length; i++) {
          Text[i].text = "　" + Text[i].text;
        }
      }

      var Buttons = [];

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo((width/5)*a,height-(width/5));
        Buttons[a].width = (width/5);
        Buttons[a].height = (width/5);
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          switch (b) {
            case "ゆさぶる":
              if(Button_push("音無し")) return;
              game.pushScene(PopScene(Datas[3],"待った！"));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case "設定を開く":
              if(Button_push("メニュー")) return;
              game.pushScene(SettingScene(Datas[5]));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case "つきつける":
              if(Button_push("メニュー")) return;
              game.pushScene(ItemScene(Datas[7],Datas[8],"アイテム"));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            default:
              if(Button_push("進む")) return;
              Scene_loads(c,false,false);
              break;
          }
        });
      }
      Button(0,"ゆさぶる",Datas[3]);//ゆさぶる
      if(Datas[4]!=false) Button(1,"◀",Datas[4]);//戻る
      Button(2,"設定を開く",Datas[5]);//設定
      Button(3,"▶",Datas[6]);//進む
      Button(4,"つきつける",Datas[7]);//つきつける

      var xxx = game.assets["image/Buttons.png"].width/8;
      var yyy = game.assets["image/Buttons.png"].height;
      var Button1 = new Sprite(xxx,yyy);
      Button1.image = game.assets["image/Buttons.png"];
      Button1.scaleX = ((width/5)/xxx);
      Button1.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button1.x = (Button1.scaleX*xxx/2)-xxx/2;
      Button1.y = (Button1.scaleY*yyy/2)-yyy/2+height-Button1.scaleY*yyy;
      Button1.frame = 0;
      //scene.addChild(Button1);
      Button1.addEventListener('touchstart',function(e){
        game.pushScene(PopScene(Datas[3],"待った！"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//ゆさぶる

      if(Datas[4]!=false){
        var xxx = game.assets["image/Buttons.png"].width/8;
        var yyy = game.assets["image/Buttons.png"].height;
        var Button2 = new Sprite(xxx,yyy);
        Button2.image = game.assets["image/Buttons.png"];
        Button2.scaleX = ((width/5)/xxx);
        Button2.scaleY = (((width/5))/yyy);//ココが変換した場所
        Button2.x = (Button2.scaleX*xxx/2)-xxx/2+(width/5);
        Button2.y = (Button2.scaleY*yyy/2)-yyy/2+height-Button2.scaleY*yyy;
        Button2.frame = 2;
        //scene.addChild(Button2);
        Button2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[4],true,false);
        });
      }//戻る

      var xxx = game.assets["image/Buttons.png"].width/8;
      var yyy = game.assets["image/Buttons.png"].height;
      var Button3 = new Sprite(xxx,yyy);
      Button3.image = game.assets["image/Buttons.png"];
      Button3.scaleX = ((width/5)/xxx);
      Button3.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button3.x = (Button3.scaleX*xxx/2)-xxx/2+(width/5)*2;
      Button3.y = (Button3.scaleY*yyy/2)-yyy/2+height-Button3.scaleY*yyy;
      Button3.frame = 3;
      //scene.addChild(Button3);
      Button3.addEventListener('touchstart',function(e){
        game.pushScene(SettingScene(Datas[5]));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//設定

      var xxx = game.assets["image/Buttons.png"].width/8;
      var yyy = game.assets["image/Buttons.png"].height;
      var Button4 = new Sprite(xxx,yyy);
      Button4.image = game.assets["image/Buttons.png"];
      Button4.scaleX = ((width/5)/xxx);
      Button4.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button4.x = (Button4.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Button4.y = (Button4.scaleY*yyy/2)-yyy/2+height-Button4.scaleY*yyy;
      Button4.frame = 5;
      //scene.addChild(Button4);
      Button4.addEventListener('touchstart',function(e){
        Scene_loads(Datas[6],false,false);
      });//進む

      var xxx = game.assets["image/Buttons.png"].width/8;
      var yyy = game.assets["image/Buttons.png"].height;
      var Button5 = new Sprite(xxx,yyy);
      Button5.image = game.assets["image/Buttons.png"];
      Button5.scaleX = ((width/5)/xxx);
      Button5.scaleY = (((width/5))/yyy);//ココが変換した場所
      Button5.x = (Button5.scaleX*xxx/2)-xxx/2+(width/5)*4;
      Button5.y = (Button5.scaleY*yyy/2)-yyy/2+height-Button5.scaleY*yyy;
      Button5.frame = 7;
      //scene.addChild(Button5);
      Button5.addEventListener('touchstart',function(e){
        game.pushScene(ItemScene(Datas[7],Datas[8],"アイテム"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//つきつける

      return scene;
    };
    var SettingScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Button = [];
      var submits = 0;
      var Numbers = (width/10)+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "設定を閉じる":
              if(Button_push("戻る")) return;
              break;
            case "サウンド設定":
            case "プレイヤー設定":
              if(Button_push("メニュー")) return;
              break;
            case "セーブする":
            if(Button_push("セーブ")) return;
              break;
            case "現在はオートセーブです。":
              if(Button_push("お任せなのだ")) return;
              break;
            default:
              if(Button_push("選択音")) return;
              break;
          }
          switch(a){
            case "設定を閉じる":
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            break;
            case "タイトルに戻る":
            game.popScene();
            game.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Scene_loads("タイトル移動",false,false,false);
            break;
            case "サウンド設定":
            game.pushScene(SoundSettingScene());
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            break;
            case "セーブする":
              Save(Number);
              this._element.value = "セーブしました。";
              break;
              case "セーブ方法の切り替え":
              if(Setting_Flag[8]){
                Button[6]._element.value = "セーブする";
                Setting_Flag[8] = false;
                scene.addChild(Button[6]);
                scene.removeChild(Button[7]);
              }
              else{
                Setting_Flag[8] = true;
                scene.addChild(Button[7]);
                scene.removeChild(Button[6]);
              }
              window.localStorage.setItem("Setting_Flag",Setting_Flag);
              break;
              case "プレイヤー設定":
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
                game.pushScene(PlayerSettingScene());
                break;
              case "セーブデータ読み込み":
              game.popScene();
              game.popScene();
              Scene_kazu--;
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              Scene_loads("セーブ読み込み",false,false);
              break;
          }
        });
        submits++;
        Numbers += (width/20)+(width/25)+(width/25);
      }

      Submit("設定を閉じる");
      Numbers += (width/20)+(width/25)+(width/25);
      Submit("タイトルに戻る");
      Submit("サウンド設定");
      Submit("プレイヤー設定");
      Submit("セーブデータ読み込み");
      Submit("セーブ方法の切り替え");
      Submit("セーブする");
      Numbers -= (width/20)+(width/25)+(width/25);
      Submit("現在はオートセーブです。");
      if(Setting_Flag[8]) scene.removeChild(Button[6]);
      else scene.removeChild(Button[7]);

      return scene;
    };
    var PlayerSettingScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = width/2;

      var Gender = new Entity();
      Gender.moveTo(width/4+width/20,Numbers);
      Gender.width = width/2;
      Gender.height = width/10;
      Gender._element = document.createElement("select");
      Numbers += (width/20)+(width/25)+(width/25);

      var Option = [];
      switch (Setting_Flag[2]) {
        case "男":
          var Choice_Transform = ["男","女","どちらでもない"];
          break;
        case "女":
          var Choice_Transform = ["女","男","どちらでもない"];
          break;
        default:
          var Choice_Transform = ["どちらでもない","男","女"];
          break;
      }

      for (var i = 0; i < Choice_Transform.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_Transform[i];
        Option[i].value = Choice_Transform[i];
        Gender._element.appendChild(Option[i]);
      }
      scene.addChild(Gender);

      var S_Input1 = new Entity();
      S_Input1.moveTo(width/4+width/20,Numbers);
      S_Input1.width = width/2;
      S_Input1.height = (width/10);
      S_Input1._element = document.createElement('input');
      S_Input1._element.value = Setting_Flag[1];
      S_Input1._element.placeholder = "苗字を入力";
      Numbers += (width/20)+(width/25)+(width/25);
      scene.addChild(S_Input1);

      var S_Input2 = new Entity();
      S_Input2.moveTo(width/4+width/20,Numbers);
      S_Input2.width = width/2;
      S_Input2.height = (width/10);
      S_Input2._element = document.createElement('input');
      S_Input2._element.value = Setting_Flag[0];
      S_Input2._element.placeholder = "名前を入力";
      scene.addChild(S_Input2);

      Numbers = (width/10)+(width/30);
      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          if(S_Input1._element.value.replace(/[^,]/g,"")!=""||S_Input2._element.value.replace(/[^,]/g,"")!=""){
            scene.addChild(Text[3]);
          }
          else{
            Setting_Flag[0] = S_Input2._element.value;
            Setting_Flag[1] = S_Input1._element.value;
            if(Gender._element.value=="男"){
              Setting_Flag[2] = "男";
              if(S_Input1._element.value=="") Setting_Flag[1] = "若辻";
              if(S_Input2._element.value=="") Setting_Flag[0] = "俛人";
            }
            else if(Gender._element.value=="女"){
              Setting_Flag[2] = "女";
              if(S_Input1._element.value=="") Setting_Flag[1] = "防人";
              if(S_Input2._element.value=="") Setting_Flag[0] = "玲奈";
            }
            else{
              Setting_Flag[2] = "未設定";
              if(S_Input1._element.value=="") Setting_Flag[1] = "カードの精霊";
              if(S_Input2._element.value=="") Setting_Flag[0] = "ユベル";
            }
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
          }
          window.localStorage.setItem("Setting_Flag",Setting_Flag);
        });
        submits++;
      }

      Submit("戻る");

      var Texts = Class.create(Label, {
        initialize: function(a,b,c) {
          Label.call(this);
          this.font  = width/10+"px monospace";
          this.color = 'black';
          this.x = width/15;
          this.y = b;
          this.width = width;
          this.height = width/10;
          this.text = a;
          i++;
          if(c!=undefined){
            this.x = width/7;
            this.color = 'red';
            this.font  = c+"px monospace";
          }
          else scene.addChild(this);
        }
      });

      var Text = [];

      Text[0] = new Texts("性別",Gender.y);
      Text[1] = new Texts("苗字",S_Input1.y);
      Text[2] = new Texts("名前",S_Input2.y);
      Text[3] = new Texts(",(カンマ)は使用できません。",width/3,width/20);

      return scene;
    };
    var SoundSettingScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = (width/10)+(width/30);
      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        });
        submits++;
      }

      Submit("戻る");

      Numbers = width/2;
      var Text = [];
      var Text_Number = 10;

      var Texts = Class.create(Label, {
        initialize: function(a,b,c) {
          Label.call(this);
          this.font  = (width/10)+"px monospace";
          this.color = 'black';
          this.x = b;
          this.y = c;
          this.width = width;
          this.height = (width/10);
          this.c = Text_Number;
          if(a==10) this.text = a;
          else this.text = " " + a;
          scene.addChild(this);
          Numbers += (width/4);
          Text_Number++;
        }
      });

      Text[Text_Number] = new Texts("BGM",width/8,Numbers);
      Text[Text_Number] = new Texts("効果音",width/8,Numbers);
      Text[Text_Number] = new Texts("音声",width/8,Numbers);

      submits = 0;
      var Button2 = [];
      function Submit2(a,b,c){
        Button2[submits] = new Entity();
        Button2[submits].moveTo(a,b);
        Button2[submits].width = width/10;
        Button2[submits].height = width/10;
        Button2[submits]._element = document.createElement('input');
        Button2[submits]._element.type = "submit";
        Button2[submits]._element.value = c;
        scene.addChild(Button2[submits]);
        Button2[submits].addEventListener('touchstart',function(e){
          if(Button_push("音無し")) return;
          switch (b) {
            case Text[10].y:
              if(c=="+"){
                if(Setting_Flag[9]!=10) Setting_Flag[9] ++;
              }
              else{
                if(Setting_Flag[9]!=0) Setting_Flag[9] --;
              }
              if(Setting_Flag[9]==10) Text[13].text = Setting_Flag[9];
              else Text[13].text = " "+Setting_Flag[9];
              for (var k = 0; k < BGMDATAS.length; k++){
                if(game.assets[BGMDATAS[k].url].状態=="再生中"){
                  var basyo = game.assets[BGMDATAS[k].url].currentTime;
                  game.assets[BGMDATAS[k].url].pause();
                  if(game.assets[BGMDATAS[k].url].src==undefined){
                    game.assets[BGMDATAS[k].url].volume = Setting_Flag[9]/10;
                    game.assets[BGMDATAS[k].url].play();
                  }
                  else{
                    game.assets[BGMDATAS[k].url]._currentTime = basyo;
                    game.assets[BGMDATAS[k].url]._volume = Setting_Flag[9]/10;
                    game.assets[BGMDATAS[k].url].play();
                    game.assets[BGMDATAS[k].url].src.loop = true;
                    game.assets[BGMDATAS[k].url].src.loopStart = BGMDATAS[k].ループ開始;
                    game.assets[BGMDATAS[k].url].src.loopEnd = BGMDATAS[k].ループ終了;
                  }
                  console.log(game.assets[BGMDATAS[k].url]);
                  if(Setting_Flag[9]==0) game.assets[BGMDATAS[k].url].stop();
                }
              }
              break;
            case Text[11].y:
              if(c=="+"){
                if(Setting_Flag[10]!=10) Setting_Flag[10] ++;
              }
              else{
                if(Setting_Flag[10]!=0) Setting_Flag[10] --;
              }
              if(Setting_Flag[10]==10) Text[14].text = Setting_Flag[10];
              else Text[14].text = " "+Setting_Flag[10];
              Sound_ON("進む",true);
              break;
            case Text[12].y:
              if(c=="+"){
                if(Setting_Flag[11]!=10) Setting_Flag[11] ++;
              }
              else{
                if(Setting_Flag[11]!=0) Setting_Flag[11] --;
              }
              if(Setting_Flag[11]==10) Text[15].text = Setting_Flag[11];
              else Text[15].text = " "+Setting_Flag[11];
              Sound_ON("音量調整用",true);
              break;
          }
          window.localStorage.setItem("Setting_Flag",Setting_Flag);
        });
        submits++;
      }
      Submit2(width/2,Text[10].y,"-");
      Text[Text_Number] = new Texts(Setting_Flag[9],width/2+width/8,Text[10].y);
      Submit2(width/2+width/4,Text[10].y,"+");
      Submit2(width/2,Text[11].y,"-");
      Text[Text_Number] = new Texts(Setting_Flag[10],width/2+width/8,Text[11].y);
      Submit2(width/2+width/4,Text[11].y,"+");
      Submit2(width/2,Text[12].y,"-");
      Text[Text_Number] = new Texts(Setting_Flag[11],width/2+width/8,Text[12].y);
      Submit2(width/2+width/4,Text[12].y,"+");

      return scene;
    }
    var InspectScene = function(Inspect,Item){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Datas[0]=="留置所") var ryu = "image/背景/留置所背景.png";
      else var ryu = conversion_url(Datas[0],"画像");
      var xxx = game.assets[ryu].width;
      var yyy = game.assets[ryu].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = game.assets[ryu];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);
      Background.addEventListener('touchstart',function(e){
        Sound_ON("選択音",true);
        if(Inspect=="Black") Scene_loads("調べる出来てない",false,Item);
        else Scene_loads("調べる何もない",false,Item);
      });

      var Touchs = Class.create(Sprite, {
        initialize: function(x,y,width1,height1,Number){
          Sprite.call(this,width1*Background.scaleX,height1*Background.scaleY);
          this.x = x*Background.scaleX;
          this.y = y*Background.scaleY;
          this.image = game.assets["image/背景/透明.png"];
          scene.addChild(this);
          this.addEventListener('touchstart',function(e){
            Sound_ON("選択音",true);
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
      Text.text = "◆ 戻る";
      //scene.addChild(Text);
      Text.addEventListener('touchstart',function(e){
        if(Setting_Flag[4].length>5){
          if(Setting_Flag[4].substring(0,6)=="アイテム使用"){
            Setting_Flag[4] = Setting_Flag[4].substring(6).split(",");
            Setting_Flag[4] = Setting_Flag[4][1];
            if(Setting_Flag[4].replace(/\d/g,"").replace(/\./g,"")=="") Setting_Flag[4] = Setting_Flag[4]*1;
          }
        }
        Scene_loads(Setting_Flag[4],true,Item);
      });

      var Modoru = new Entity();
      Modoru.moveTo(width/4,width/16*9+(width/30));
      Modoru.width = width/2;
      Modoru.height = (width/10);
      Modoru._element = document.createElement('input');
      Modoru._element.type = "submit";
      Modoru._element.value = "戻る";
      scene.addChild(Modoru);
      Modoru.addEventListener('touchstart',function(e){
        if(Button_push("戻る")) return;
        Scene_loads(Setting_Flag[4],true,Item);
      });

      return scene;
    };
    var ItemgetScene = function(a,b,c){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(width,height-(width/16)*9);
      Background.image = game.assets["image/white.png"];
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
          this.width = width*2;
          this.height = (width/20);
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          scene.addChild(this);
        }
      });

      var Text =[];

      for (var i = 0; i < 6; i++) {
        Text[i] = new Texts("");
      }

      var Time = 0;
      var k = 0;
      var Text_defined = true;

      function T_D(){
        var s = true;
        Time ++;
        if(s){
          if(b.substring(Time-1,Time)=="↓"){
            k++;
          }
          else if(b.substring(Time-1,Time)!=""){
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

      var xxx = game.assets["image/Buttons.png"].width/8;
      var yyy = game.assets["image/Buttons.png"].height;
      var Enter1 = new Sprite(xxx,yyy);
      Enter1.image = game.assets["image/Buttons.png"];
      Enter1.scaleX = ((width/5)/xxx);
      Enter1.scaleY = (((width/5))/yyy);//ココが変換した場所
      Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
      Enter1.frame = 5;
      //scene.addChild(Enter1);

      var Buttons = new Entity();
      Buttons.moveTo((width/5)*3,height-(width/5));
      Buttons.width = (width/5);
      Buttons.height = (width/5);
      Buttons._element = document.createElement('input');
      Buttons._element.type = "submit";
      Buttons._element.value = "▶";
      scene.addChild(Buttons);

      var xxx = game.assets[a].width;
      var yyy = game.assets[a].height;
      var Item = new Sprite(xxx,yyy);
      Item.scaleX = ((width/2)/xxx);
      Item.scaleY = ((width/2)/yyy);
      Item.image = game.assets[a];
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
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      })

      Buttons.addEventListener('touchstart',function(e){
        if(Button_push("進む")) return;
        if(Text_defined){
          Text_defined = false;
          for (var i = 0; i < 6; i++) {
            Text[i].text = "";
          }
          Time = 0;
          k = 0;
          for (var i = 0; i < b.length+1; i++) {
            T_D();
          }
        }
        if(Item.x>X_0+width/2-width/4){
          Item.x = X_0 + width/2 -width/4;
        }
        else if(Item.x==X_0+width/2-width/4){
          Item.x -= width/18+1;
        }
        else{
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,false,false);
        }
      });//進む
      return scene;
    }
    var ItemScene = function(Number,Ig,Type){

      var scene = new Scene();                                // 新しいシーンを作る
      switch (Type) {
        case "アイテム":
          var PAGAS = 5;
          var Choice_Flag = Item_Flag;
          var Type2 = "人物";
          break;
        case "人物":
          var PAGAS = 6;
          var Choice_Flag = Character_Flag;
          if(Ig) var Type2 = "アイテム";
          else var Type2 = "トロフィー";
          break;
        case "トロフィー":
          var PAGAS = 7;
          var Choice_Flag = Trophy_Flag;
          var Type2 = "アイテム";
          break;
      }
      console.log(Type);

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Item_image = new Sprite(0,0);
      scene.addChild(Item_image);

      var Button = [];
      var submits = 0;
      function Submit(a,b,c,d,e,f){
        Button[submits] = new Entity();
        Button[submits].moveTo(b,c);
        Button[submits].width = d;
        Button[submits].height = e;
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        if(a) scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "戻る":
              var ooo = "戻る";
              break;
              case "▶":
              case "◀":
              var ooo ="メニュー移動";
              break;
            case "設定を開く":
            case Type2:
              var ooo ="メニュー";
              break;
            default:
              var ooo ="選択音";
              break;
          }
          if(this.backgroundColor=="red"){
            var ooo ="戻る";
          }
          if(Button_push(ooo)) return;
          if(this.backgroundColor=="red"){
            game.replaceScene(ItemScene(Number,Ig,Type));
          }
          switch (this._element.value) {
            case "召喚":
              Moves = "空";
              game.replaceScene(MoveScene(10));
              console.log("Scene数",Scene_kazu);
              break;
            case "遊ぶ":
              OASOBI = true;
              game.popScene();
              game.pushScene(ReversiScene());
              console.log("Scene数",Scene_kazu);
              break;
            case "改造":
              game.replaceScene(TransformScene(Number,Ig));
              console.log("Scene数",Scene_kazu);
              break;
            case "詳細":
            case "見る":
            case "拡大":
              game.pushScene(DetailsScene(this.syousai,this._element.value));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case "▶":
              if(Setting_Flag[PAGAS]==0){
                Setting_Flag[PAGAS] = Choice_Flag.length-Choice_Flag.length%5;
                if(Choice_Flag.length%5==0) Setting_Flag[PAGAS]-=5;
              }
              else Setting_Flag[PAGAS]-=5;
              game.replaceScene(ItemScene(Number,Ig,Type));
              break;
            case "◀":
              if(Setting_Flag[PAGAS] == Choice_Flag.length-Choice_Flag.length%5) Setting_Flag[PAGAS] = 0;
              else{
                Setting_Flag[PAGAS]+=5;
                if(Setting_Flag[PAGAS]==Choice_Flag.length) Setting_Flag[PAGAS] = 0;
              }
              game.replaceScene(ItemScene(Number,Ig,Type));
              break;
            case "戻る":
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              break;
            case "設定を開く":
              game.pushScene(SettingScene(Number));
              Scene_kazu++;
              console.log("Scene数",Scene_kazu);
              break;
            case Type2:
              game.replaceScene(ItemScene(Number,Ig,Type2));
              break;
            case "つきつける":
              game.popScene();
              Scene_kazu--;
              console.log("Scene数",Scene_kazu);
              if(Ig==Choice_Item||(Ig!="日常"&&(Choice_Item=="強欲な壺"||Choice_Item=="ヒントカード"))){
                if(Choice_Item=="ヒントカード"){
                  Scene_loads("ヒント"+Number,false,false);
                  return;
                }
                if(Choice_Item=="強欲な壺"){
                  Get_ICF("アイテム","強欲な壺","消失");
                  Choice_Flag[Choice_Flag.length] = ["強欲なカケラ","強欲な壺を使った証。","強欲なカケラ"];
                }
                game.pushScene(PopScene(Number,"異議あり！"));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
              }
              else if(Ig=="日常") Scene_loads(Number,true,"つきつける"+Choice_Item);
              else{
                game.pushScene(PopScene("つきつけ失敗","異議あり！"));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
              }
              break;
            default:
              for (var i = 0; i < 5; i++) {
                if(f[1].split("↓")[i]==undefined) Text[i].text = "";
                else Text[i].text = f[1].split("↓")[i];
              }
              for (var i = 0; i < submits; i++) {
                Button[i].backgroundColor = "buttonface";
              }
              Choice_Item = f[0];
              console.log(Choice_Item+"を選択");
              var Item_image_url = conversion_url(f[2],"画像");
              var xxx = game.assets[Item_image_url].width;
              var yyy = game.assets[Item_image_url].height;
              Item_image.image = game.assets[Item_image_url];
              Item_image.width = xxx;
              Item_image.height = yyy;
              Item_image.scaleX = ((width/4)/xxx);
              Item_image.scaleY = ((width/4)/yyy);
              Item_image.x = (Item_image.scaleX*xxx/2)-xxx/2+(width/1.6);
              Item_image.y = (Item_image.scaleY*yyy/2)-yyy/2+(width/4)+(width/20)+(width/25);
              this.backgroundColor = "red";
              if(f[3]){
                Button[3]._element.value = f[3];
                Button[3].syousai = f[4];
                scene.addChild(Button[3]);
              }
              else scene.removeChild(Button[3]);
              if(Ig){
                Button[4]._element.value = "つきつける";
                scene.addChild(Button[4]);
              }
              console.log(f);
              break;
          }
        });
        submits++;
      }
      var S_X_H = (width-width/6)/3-width/12;
      var S_Y_H = width/10;
      var W_X_H = width/12;
      var W_Y_H = width/9;
      Submit("戻る",W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("設定を開く",width/2-S_X_H/2,W_Y_H,S_X_H,S_Y_H);
      Submit(Type2,width-S_X_H-W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("",width/2+width/20,(width/4)+((width/20)+(width/25)+(width/50))*4,width/2.5+W_X_H-width/8,W_X_H)
      Submit("",width/2+width/20,(width/4)+((width/20)+(width/25)*14),width/2.5+W_X_H-width/8,W_X_H);

      var Text = [];
      var Text_Number = 0;

      function Description_text(){
        Text[Text_Number] = new Label();
        Text[Text_Number].font  = (width/20)+"px monospace";
        Text[Text_Number].color = 'black';
        Text[Text_Number].x = (width/8);
        Text[Text_Number].y = (width/4) + ((width/20)+(width/25)*(18+Text_Number*2)) - (width/25);
        Text[Text_Number].width = width;
        Text[Text_Number].height = (width/20);
        Text[Text_Number].text = "";
        scene.addChild(Text[Text_Number]);
      }

      for (var i = 0; i < 5; i++) {
        Description_text();
        Text_Number++;
      }

      if(Choice_Flag.length>5){
        Submit("◀",width/8,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
        Submit("▶",width/2.5,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
      }
      else Setting_Flag[PAGAS] = 0;


      var Item = [];
      var Image = [];
      var Item_Number = 0;
      var Numbers = (width/4);
      var Choice_Item = "未設定";

      for (var i = 0; i < 5; i++) {
        if(Choice_Flag[i+Setting_Flag[PAGAS]]){
          //Item[Item_Number] = new Items(Choice_Flag[i+Setting_Flag[PAGAS]]);
          Submit(Choice_Flag[i+Setting_Flag[PAGAS]][0],width/8,Numbers,width/2.5+W_X_H-width/8,W_X_H,Choice_Flag[i+Setting_Flag[PAGAS]]);
          Numbers += (width/20)+(width/25)+(width/50);
        };
      }

      return scene;
    }
    var DetailsScene = function(Number,Type){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Numbers = (width/10)+(width/30);
      var Button = [];
      var submits = 0;
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          if(Button_push("戻る")) return;
          game.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        });
        submits++;
      }

      Submit("戻る");

      switch (Type) {
          case "見る":
          case "拡大":
          Number = conversion_url(Number,"画像");
          var xxx = game.assets[Number].width;
          var yyy = game.assets[Number].height;
          var Photo = new Sprite(xxx,yyy);
          Photo.scaleX = ((width)/xxx)*0.8;
          Photo.scaleY = ((width)/yyy)*0.8;
          if(xxx!=yyy) Photo.scaleY = Photo.scaleY/16*9;
          Photo.image = game.assets[Number];
          Photo.x = (Photo.scaleX*xxx/2)-xxx/2+(width/10);
          Photo.y = (Photo.scaleY*yyy/2)-yyy/2+Numbers+(width/5);
          scene.addChild(Photo);
          break;
        default:
          if(Number.substring(0,7)=="YOUTUBE"){
            Number = Number.substring(7);
            var Video = new Entity()
            Video.visible =  true;
            Video._element = document.createElement('div')
            Video.x = (width/10);
            Video.y = Numbers+(width/5);
            Video._element.innerHTML = '<iframe src="https://www.youtube.com/embed/'+Number+'?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="'+(width*0.8)+'" height="'+(width/16*9*0.8)+'" frameborder="0" id="player"></iframe>'
            scene.addChild(Video);
          }
          else {
            var S_Text = Number.replace(/\n/g,"↓").split("↓");
            for (var i = 1; i < S_Text.length+1; i++) {
              Text[i] = new Texts(S_Text[i-1]);
              if(i==13) break;
            }
          }
          break;
      }

      var Pages3 = -1;

      for (var i = 1; i < Text.length; i++) {
        Text[i].addEventListener('touchstart',function(e){
          if(this.text=="◆ 次のページ"){
            Pages3 += 13;
            for (var i = 1; i < Text.length; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
          else if(this.text=="◆ 前のページ"){
            Pages3 -= 13;
            for (var i = 1; i < Text.length; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
          else if(this.text=="◆ 最初のページ"){
            Pages3 = -1;
            for (var i = 1; i < 14; i++) {
              if(S_Text[Pages3+i]) Text[i].text = S_Text[Pages3+i];
              else Text[i].text = "";
            }
          }
        });
      }

      return scene;
    };
    var ClearScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
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

      var Button = [];
      var submits = 0;
      var Numbers = width/16*9+(width/30);
      function Submit(a){
        Button[submits] = new Entity();
        Button[submits].moveTo(width/4,Numbers);
        Numbers += (width/20)+(width/25)+(width/25)+(width/25)+(width/25)+(width/25);
        Button[submits].width = width/2;
        Button[submits].height = (width/10);
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        submits++;
      }

      var Text = [];

      Submit("データ初期化実行");
      Submit("戻る");

      //Text[0] = new Texts("データを初期化する？");
      //Text[1] = new Texts("◆ はい");
      //Text[2] = new Texts("◆ いいえ");

      Button[0].addEventListener('touchstart',function(e){
        if(Button_push("音無し")) return;
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Data = false;
        window.localStorage.clear();
        Datas = [];
        Setting_Flag = ["名前","苗字","未設定",10,"最初から",0,0,0,true,5,5,5];
        //[0名前,1苗字,2性別,3体力,4直前,5アイテムページ,6人物ページ,7トロフィーページ,8オートセーブ,9BGM音量,10効果音音量,11音声音量];
        Flag = [];//フラグ
        Item_Flag = [];//所持アイテム
        Character_Flag = [];//人物
        Trophy_Flag = [];//トロフィー
        Pages = 0;//アイテムのページ
        Pages2 = 0;//人物のページ
        Pages4 = 0;//トロフィーのページ
        Text = "";
        Scene_type = "メイン";
        Scene_kazu = 1;
        Get = false;
        game.replaceScene(TitleScene());
        return;
      });

      Button[1].addEventListener('touchstart',function(e){
        if(Button_push("戻る")) return;
        game.popScene();
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
      Pointer.image = game.assets["image/Hand.png"];

      var White = new Sprite(405,600);
      White.image = game.assets["image/white.png"];
      scene.addChild(White);

      var Reversi = new Sprite(405,405);
      Reversi.image = game.assets[conversion_url("リバーシ","画像")];
      Reversi.x = 0;
      Reversi.y = 40;
      scene.addChild(Reversi);

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 195;
      scene.addChild(Set_button);

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = game.assets["image/Set_button.png"];
      Set_button1.x = 5;
      Set_button1.y = 295;
      Set_button1.frame = 1;
      scene.addChild(Set_button1);

      var Set_button2 = new Sprite(195,95);
      Set_button2.image = game.assets["image/Set_button.png"];
      Set_button2.x = 205;
      Set_button2.y = 295;
      Set_button2.frame = 2;
      scene.addChild(Set_button2);

      var Set_button3 = new Sprite(195,95);
      Set_button3.image = game.assets["image/Set_button.png"];
      Set_button3.x = 205;
      Set_button3.y = 145;
      Set_button3.frame = 9;

      var Set_button4 = new Sprite(195,95);
      Set_button4.image = game.assets["image/Set_button.png"];
      Set_button4.x = 105;
      Set_button4.y = 455;
      Set_button4.frame = 13;
      scene.addChild(Set_button4);
      Set_button4.addEventListener('touchstart',function(e){
        game.pushScene(ReturnScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button5 = new Sprite(195,95);
      Set_button5.image = game.assets["image/Set_button.png"];
      Set_button5.x = 105;
      Set_button5.y = 245;
      Set_button5.frame = 11;

      var Stone = Class.create(Sprite, {
        initialize: function(x,y,z) {
          Sprite.call(this, 45, 45);
          this.x = 50*x+5;
          this.y = 50*y+45;
          this.image = game.assets['image/stone.png'];
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
      Hand.image = game.assets["image/Hand.png"];

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
          V_or_D.image = game.assets["image/V_or_D.png"];
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
            game.pushScene(ItemgetScene(conversion_url("強欲な壺","画像"),"おめでとうございます！↓賞品として強欲な壺をプレゼント！","リバーシ"));
            Item_Flag[Item_Flag.length] = ["強欲な壺","チーター(強)に勝って貰った賞品。↓尋問時につきつけると先へ進める。↓その後強欲な壺が一つ無くなり↓強欲なカケラを入手する。","強欲な壺"];
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(OASOBI=="勝ち"){
            OASOBI = true;
            game.pushScene(ItemgetScene(conversion_url("ヒントカード","画像"),"おめでとうございます！↓賞品としてヒントカードをプレゼント！","リバーシ"));
            Item_Flag[Item_Flag.length] = ["ヒントカード","AIに勝って貰った賞品。↓尋問時につきつけると↓ヒントと交換してもらえる。","ヒントカード"];
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
      White.image = game.assets["image/white.png"];
      scene.addChild(White);

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 195;
      Set_button.frame = 12;
      scene.addChild(Set_button);
      Set_button.addEventListener('touchstart',function(e){
        game.popScene();
        game.replaceScene(ReversiScene());
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = game.assets["image/Set_button.png"];
      Set_button1.x = 105;
      Set_button1.frame = 14;
      scene.addChild(Set_button1);
      Set_button1.addEventListener('touchstart',function(e){
        OASOBI = false;
        game.popScene();
        game.popScene();
        Scene_kazu--;
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      var Set_button2 = new Sprite(195,95);
      Set_button2.image = game.assets["image/Set_button.png"];
      Set_button2.x = 105;
      Set_button2.y = 455;
      Set_button2.frame = 10;
      scene.addChild(Set_button2);
      Set_button2.addEventListener('touchstart',function(e){
        game.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
      });

      return scene;
    };
    var TransformScene = function(Number,Ig){
      var scene = new Scene();                                // 新しいシーンを作る

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
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
          this.x = (width/10);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          scene.addChild(this);
        }
      });

      var Text = [];

      Text[0] = new Texts("◆ 改造をやめる");

      Numbers += (width/20)+(width/25);
      Numbers += (width/20)+(width/25);
      var S_Input = new Entity();
      S_Input.moveTo((width/10),Numbers);
      S_Input.width = 190;
      S_Input.height = (width/20);
      S_Input._element = document.createElement("select");

      var Option = [];
      var Choice_Transform = ["することを選択","アイテム作成","フラグ追加 or 消去","体力変更","シーンデータ修正","アイテムリセット","人物リセット","フラグリセット","トロフィーリセット"];

      for (var i = 0; i < Choice_Transform.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_Transform[i];
        Option[i].value = Choice_Transform[i];
        S_Input._element.appendChild(Option[i]);
      }
      scene.addChild(S_Input);

      Numbers += (width/20)+(width/25);
      var S_Input1 = new Entity();
      S_Input1.moveTo((width/10),Numbers);
      S_Input1.width = 190;
      S_Input1.height = (width/20);
      S_Input1._element = document.createElement("select");

      function S_Inputs(a){
        Numbers += (width/20)+(width/25);
        S_Inputss[a] = new Entity();
        S_Inputss[a].moveTo((width/10),Numbers);
        S_Inputss[a].width = 190;
        S_Inputss[a].height = (width/20);
        S_Inputss[a]._element = document.createElement('input');
        S_Inputss[a]._element.type = "text";
        S_Inputss[a]._element.value = "ここに入力";
        scene.addChild(S_Inputss[a]);
      }

      var S_Inputss = [];

      for (var i = 0; i < 3; i++) {
        S_Inputs(i);
      }

      Numbers += (width/20)+(width/25);
      var S_Input3 = new Entity();
      S_Input3.moveTo((width/10),Numbers);
      S_Input3.width = 190;
      S_Input3.height = (width/20);
      S_Input3._element = document.createElement("select");

      Option = [];
      Choice_Transform = ["詳細","見る"];

      for (var i = 0; i < Choice_Transform.length; i++){
        Option[i] = document.createElement("option");
        Option[i].text = Choice_Transform[i];
        Option[i].value = Choice_Transform[i];
        S_Input3._element.appendChild(Option[i]);
      }
      scene.addChild(S_Input3);

      Option = [];

      for (var i = 1; i < ImageDATAS.length; i++){
        Option[i-1] = document.createElement("option");
        Option[i-1].text = ImageDATAS[i].名前;
        Option[i-1].value = ImageDATAS[i].名前;
        S_Input1._element.appendChild(Option[i-1]);
      }
      scene.addChild(S_Input1);

      Numbers += (width/20)+(width/25);
      var S_Input2 = new Entity();
      S_Input2.moveTo((width/10),Numbers);
      S_Input2.width = 190;
      S_Input2.height = (width/20);
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "submit";
      S_Input2._element.value = "実行する";
      scene.addChild(S_Input2);

      for (var i = 1; i < 6; i++) {
        Text[i] = new Texts("");
      }

      S_Input2.addEventListener('touchstart',function(e){
        for (var i = 5; i > 1; i--) {
          Text[i].text = Text[i-1].text;
        }
        for (var i = 0; i < 3; i++) {
          if(S_Inputss[i]._element.value.replace(/[^,]/g,"")!=""){
            Text[1].text = ",(カンマ)は使用できません。";
            return;
          }
        }
        switch (S_Input._element.value) {
          case "アイテム作成":
            Item_Flag[Item_Flag.length] = [S_Inputss[0]._element.value,S_Inputss[1]._element.value,S_Input1._element.value,S_Input3._element.value,S_Inputss[2]._element.value];
            Text[1].text = S_Inputss[0]._element.value+" 入手。";
            Sound_ON("Item",true);
            break;
          case "シーンデータ修正":
            game.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Datas = ["Black",0,0,0,0,0,0,0,"シーンデータを修正しました。",0,0,0,Setting_Flag[4],0];
            game.replaceScene(MainScene());
            Sound_ON("Item",true);
            break;
          case "フラグ追加 or 消去":
            for (var i = 0; i < Flag.length; i++){
              if(Flag[i]==S_Inputss[0]._element.value){
                Flag[i] = false;
                Text[1].text = S_Inputss[0]._element.value+" オフ。";
                Sound_ON("Item",true);
                return;
              }
            }
            Flag[Flag.length] = S_Inputss[0]._element.value;
            Text[1].text = S_Inputss[0]._element.value+" オン。";
            Sound_ON("Item",true);
            break;
          case "体力変更":
            Setting_Flag[3] = S_Inputss[0]._element.value*1;
            Text[1].text = "残り回数 = " + Setting_Flag[3];
            Sound_ON("Item",true);
            break;
          case "フラグリセット":
            Flag = [];
            Text[1].text = S_Input._element.value;
            Sound_ON("Item",true);
            break;
          case "アイテムリセット":
            for (var i = 0; i < Item_Flag.length; i++) {
              if(Item_Flag[i][0]=="消えたアイテム") break;
            }
            if(i==Item_Flag.length) var Item_Flag2 = "";
            else var Item_Flag2 = Item_Flag[i][4];
            var k = 0;
            for (var i = 0; i < Item_Flag.length; i++) {
              if(Item_Flag[i][0]!="赤き竜"&&Item_Flag[i][0]!="能力調整"&&Item_Flag[i][0]!="消えたアイテム") Item_Flag2 += Item_Flag[i][0] + "↓";
              if(Item_Flag2.replace(/[^↓]/g,"").length%12==k&&Item_Flag2.replace(/[^↓]/g,"").length>11){
                Item_Flag2+="◆ 次のページ↓◆ 前のページ↓";
                k++;
              }
            }
            Item_Flag = [
              ["能力調整","アイテムの創造↓フラグの発現、消去↓体力増減、データ修正↓などが出来るぞ。","能力調整","改造"],
              ["赤き竜","召喚すると↓メイン、チョイス、尋問の中から↓好きなシーンに飛べる。","タクシー","召喚"],
              ["消えたアイテム","消えたアイテムが書かれたメモ。","紙","詳細",Item_Flag2]
            ];
            Text[1].text = S_Input._element.value;
            Sound_ON("Item",true);
            break;
          case "人物リセット":
            Character_Flag = [];
            Text[1].text = S_Input._element.value;
            Sound_ON("Item",true);
            break;
          case "トロフィーリセット":
            Trophy_Flag = [];
            Text[1].text = S_Input._element.value;
            Sound_ON("Item",true);
            break;
          default:
            Text[1].text = "することを選択してください。";
            break;
        }
        return;
      });

      Text[0].addEventListener('touchstart',function(e){
          game.replaceScene(ItemScene(Number,Ig,"アイテム"));
          console.log("Scene数",Scene_kazu);
          return;
      });

      return scene;
    };
    game.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
