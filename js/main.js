enchant()

function Load(width,height){
  var core = new Core(width, height);
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
  core.preload("image/背景/stand.png");
  core.preload("image/背景/Black.png");
  core.preload("image/背景/right.png");
  core.preload("image/背景/裁判長.png");
  core.preload("image/背景/留置所.png");
  core.preload("image/Background.png");
  core.preload("image/Trophies_image.png");
  core.preload("image/背景/透明.png");
  for (var i = 1; i <= 2; i++){
    core.preload("image/背景/"+i+".png");
  }
  for (var i = 1; i <= 4; i++){
    core.preload("image/アイテム/"+i+".png");
  }
  for (var i = 1; i <= 22; i++){
    core.preload("image/人物/"+i+".png");
  }
  for (var i = 0; i <= 1; i++){
    core.preload("image/アイテム詳細/"+i+".png");
  }
  for (var i = 1; i <= 8; i++){
    core.preload("image/人物/詳細/"+i+".png");
  }
  core.fps = 100;
  core.onload = function(){


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
      if(Number=="セーブ読み込み") Scene_type = Number;
      else Scene_loads2(Number,Item);
      //console.log(Scene_type);
      Sound_ON("Choice",true);
      switch (Scene_type) {
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
        case "タイトルに戻る":
          core.replaceScene(TitleScene());
          break;
        case "セーブ読み込み":
          BGM_Stop(true);
          Scene_loads2(Load_Datas(),Item);
          switch (Scene_type) {
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
            case "タイトルに戻る":
              core.replaceScene(TitleScene());
              break;
          }
          break;
        default:
          if(Scene_type.length==3){
            core.pushScene(ItemgetScene(Scene_type[0],Scene_type[1],Scene_type[2]));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
            return;
          }
          else if(Scene_type.substring(0,5)=="異議あり！"){
            Number = Scene_type.substring(5);
            if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1
            core.pushScene(PopScene(Number,"異議あり！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else if(Scene_type.substring(0,4)=="待った！"){
            Number = Scene_type.substring(4);
            if(Number.replace(/\d/g,"").replace(/\./g,"")=="") Number = Number*1
            core.pushScene(PopScene(Number,"待った！"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
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
        else if(Flag[i].replace(/\d/g,"").replace(/\./g,"")=="") Flag[i] = Flag[i] *1;
      }
      for (var i = 0; i < Datas.length; i++){
        if(Datas[i].replace(/\d/g,"").replace(/\./g,"")=="") Datas[i] = Datas[i] *1;
      }
      Pages = Flag[7].split("乙");
      Pages2 = Pages[1]*1;
      Pages = Pages[0]*1;
      //console.log(Number);
      return(Number);
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
          if(this.text == "▶ 最初から") Scene_loads(1,false,false);
          if(this.text == "▶ 続きから") Scene_loads("セーブ読み込み",false,false);
          if(this.text == "▶ 説明") Scene_loads(-1,false,false);
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

      return scene;
    };
    var MainScene = function(Return){
      var scene = new Scene();                                // 新しいシーンを作る

      var OK = true;

      if(Datas[12]!=false){
        if(Datas[12].length>1){
          if(Datas[12].substring(0,2)=="使う") OK = false;
          if(Datas[12].length>2){
            if(Datas[12].substring(0,3)=="調べる") OK = false;
            if(Datas[12].length>4){
              if(Datas[12].substring(0,5)=="つきつける") OK = false;
            }
          }
        }
        if(OK) Flag[4] = Datas[12];
        if(Flag[8]){
          Save(Datas[12]);
        }
      }

      var xxx = core.assets["image/背景/"+ Datas[0] +".png"].width;
      var yyy = core.assets["image/背景/"+ Datas[0] +".png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = width/xxx;
      Background.scaleY = width/16*9/yyy;
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;

      if(Datas[1]!=0){
        if(Datas[1]>0){
          if(Return!=true){
            Background.opacity = 0;
            Background.tl.fadeIn(Datas[1]);
          }
        }
        else{
          if(Return!=true){
            Background.tl.fadeOut(Datas[1]*-1);
          }
          else Background.opacity = 0;
        }
      }
      scene.addChild(Background);//背景

      if(Datas[4]!=false){
        var xxx = core.assets["image/人物/"+Datas[4]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[4]+".png"].height;
        var Character2 = new Sprite(xxx,yyy);
        Character2.scaleX = ((width/2)/xxx);
        Character2.scaleY = (((width/16)*9)/yyy);
        Character2.image = core.assets["image/人物/"+Datas[4]+".png"];
        Character2.x = (Character2.scaleX*xxx/2)-xxx/2+(width/4);
        Character2.y = (Character2.scaleX*yyy/2)-yyy/2;
        if(Datas[5]!=0){
          if(Datas[5]>0){
            if(Return!=true){
              Character2.opacity = 0;
              Character2.tl.fadeIn(Datas[5]);
            }
          }
          else{
            if(Return!=true){
              Character2.tl.fadeOut(Datas[5]*-1);
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

      if(Datas[2]!=false){
        var xxx = core.assets["image/人物/"+Datas[2]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[2]+".png"].height;
        var Character1 = new Sprite(xxx,yyy);
        Character1.scaleX = ((width/2)/xxx);
        Character1.scaleY = (((width/16)*9)/yyy);
        Character1.image = core.assets["image/人物/"+Datas[2]+".png"];
        Character1.x = (Character1.scaleX*xxx/2)-xxx/2;
        Character1.y = (Character1.scaleX*yyy/2)-yyy/2;
        if(Datas[3]!=0){
          if(Datas[3]>0){
            if(Return!=true){
              Character1.opacity = 0;
              Character1.tl.fadeIn(Datas[3]);
            }
          }
          else{
            if(Return!=true){
              Character1.tl.fadeOut(Datas[3]*-1);
            }
            else Character1.opacity = 0;
          }
        }
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[6]!=false){
        var xxx = core.assets["image/人物/"+Datas[6]+".png"].width;
        var yyy = core.assets["image/人物/"+Datas[6]+".png"].height;
        var Character3 = new Sprite(xxx,yyy);
        Character3.scaleX = ((width/2)/xxx);
        Character3.scaleY = (((width/16)*9)/yyy);
        Character3.image = core.assets["image/人物/"+Datas[6]+".png"];
        Character3.x = (Character3.scaleX*xxx/2)-xxx/2+(width/2);
        Character3.y = (Character3.scaleX*yyy/2)-yyy/2;
        if(Datas[7]!=0){
          if(Datas[7]>0){
            if(Return!=true){
              Character3.opacity = 0;
              Character3.tl.fadeIn(Datas[7]);
            }
          }
          else{
            if(Return!=true){
              Character3.tl.fadeOut(Datas[7]*-1);
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

      if(Datas[15]!=undefined&&Datas[15]!=false){
        var xxx = core.assets["image/アイテム/"+Datas[16]+".png"].width;
        var yyy = core.assets["image/アイテム/"+Datas[16]+".png"].height;
        var Item = new Sprite(xxx,yyy);
        Item.scaleX = ((width/4)/xxx);
        Item.scaleY = ((width/4)/yyy);
        Item.image = core.assets["image/アイテム/"+Datas[16]+".png"];
        Item.x = ((Item.scaleX*xxx/2)-xxx/2)+Datas[15].substring(0,4)*(width/1600);
        Item.y = ((Item.scaleY*yyy/2)-yyy/2)+Datas[15].substring(5,9)*(width/16/100);
        if(Return!=true&&Datas[15].substring(11,12)*1!=0){
          Sound_ON("Choice",true);
          Item.opacity = 0;
          Item.tl.fadeIn(Datas[15].substring(11,12)*1);
        }
        scene.addChild(Item);
      }//アイテム

      var Background2 = new Sprite(width,(width/16)*9);
      Background2.image = core.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = (width/16)*9;
      scene.addChild(Background2);//白地

      if(Datas[8]!=""){
        var C_name = new Label();
        C_name.font  = (width/20)+"px monospace";
        C_name.color = 'black';
        C_name.x = 0;
        C_name.y = width/16*9+(width/25);
        C_name.width = width;
        C_name.height = (width/20);
        C_name.text = "【" + Datas[8] + "】";
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

      var Text = Datas[9].split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }


      if(Text[0].text.substring(0,1)=="("&&Text[i-1].text.substring(Text[i-1].text.length-1)==")"){
        for (var i = 0; i < Text.length; i++) {
          Text[i].color = "blue";
        }
      }

      if(Datas[10]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return1 = new Sprite(xxx,yyy);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.scaleX = ((width/5)/xxx);
        Return1.scaleY = (((width/20))/yyy);
        Return1.x = (Return1.scaleX*xxx/2)-xxx/2;
        Return1.y = (Return1.scaleY*yyy/2)-yyy/2+height-Return1.scaleY*yyy;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[10],true,false);
        });
      } //戻る1

      if(Datas[11]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return2 = new Sprite(xxx,yyy);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.scaleX = ((width/5)/xxx);
        Return2.scaleY = (((width/20))/yyy);
        Return2.x = (Return2.scaleX*xxx/2)-xxx/2+(width/5)*1;
        Return2.y = (Return2.scaleY*yyy/2)-yyy/2+height-Return2.scaleY*yyy;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[11],true,false);
        });
      }//戻る2

      if(Datas[12]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Settings = new Sprite(xxx,yyy);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.scaleX = ((width/5)/xxx);
        Settings.scaleY = (((width/20))/yyy);
        Settings.x = (Settings.scaleX*xxx/2)-xxx/2+(width/5)*2;
        Settings.y = (Settings.scaleY*yyy/2)-yyy/2+height-Settings.scaleY*yyy;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[12],false));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        });
      }//アイテム画面

      if(Datas[13]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Enter1 = new Sprite(xxx,yyy);
        Enter1.image = core.assets["image/Buttons.png"];
        Enter1.scaleX = ((width/5)/xxx);
        Enter1.scaleY = (((width/20))/yyy);
        Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
        Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
        Enter1.frame = 5;
        scene.addChild(Enter1);
        Enter1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],false,false);
        });
      }//進む1

      if(Datas[14]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Enter2 = new Sprite(xxx,yyy);
        Enter2.image = core.assets["image/Buttons.png"];
        Enter2.scaleX = ((width/5)/xxx);
        Enter2.scaleY = (((width/20))/yyy);
        Enter2.x = (Enter2.scaleX*xxx/2)-xxx/2+(width/5)*4;
        Enter2.y = (Enter2.scaleY*yyy/2)-yyy/2+height-Enter2.scaleY*yyy;
        Enter2.frame = 6;
        scene.addChild(Enter2);
        Enter2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[14],false,false);
        });//進む2
      }

      if(Datas[17]!=undefined){
        if(window.localStorage.getItem(Datas[17])==undefined){
          if(Datas[12]>0) window.localStorage.setItem(Datas[17],"獲得！");
          var Time = 0;
          var Trophies = new Sprite(443,113);
          Trophies.image = core.assets["image/Trophies.png"];
          Trophies.x = width-463;
          Trophies.y = 20;
          Trophies.opacity = 0;
          Trophies.tl.fadeIn(5);
          scene.addChild(Trophies);
          var Trophies_image = new Sprite(88,85);
          Trophies_image.image = core.assets["image/Trophies_image.png"];
          Trophies_image.x = width-453;
          Trophies_image.y = 35;
          Trophies_image.frame = Datas[18];
          Trophies_image.opacity = 0;
          Trophies_image.tl.fadeIn(5);
          scene.addChild(Trophies_image);
          var Trophies_text = new Label();
          Trophies_text.font  = (width/20)+"px monospace";
          Trophies_text.color = 'white';
          Trophies_text.x = width-453+145;
          Trophies_text.y = 90;
          Trophies_text.width = width;
          Trophies_text.height = 30;
          Trophies_text.opacity = 0;
          Trophies_text.tl.fadeIn(5);
          Trophies_text.text = Datas[17];
          scene.addChild(Trophies_text);
          Sound_ON("Trophies",true);
          Trophies.addEventListener("enterframe",function(){
            Time++;
            if(Time==50){
              Trophies.tl.fadeOut(5);
              Trophies_image.tl.fadeOut(5);
              Trophies_text.tl.fadeOut(5);
            }
          })
        }
      }//トロフィー*/
      return scene;
    };
    var ChoiceScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var OK = true;

      if(Datas[14].length>1){
        if(Datas[14].substring(0,2)=="使う") OK = false;
        if(Datas[14].length>2){
          if(Datas[14].substring(0,3)=="調べる") OK = false;
          if(Datas[14].length>4){
            if(Datas[14].substring(0,5)=="つきつける") OK = false;
          }
        }
      }
      if(OK) Flag[4] = Datas[14];
      if(Flag[8]&&Datas[14]!="ゲームオーバー"){
        Save(Datas[14]);
      }

      var xxx = core.assets["image/背景/"+ Datas[0] +".png"].width;
      var yyy = core.assets["image/背景/"+ Datas[0] +".png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = (((width/16)*9)/yyy);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

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

      if(Datas[4]!=false){
        var C1 = new Label();
        C1.font  = (width/20)+"px monospace";
        C1.color = 'black';
        C1.x = 0;
        C1.y = (height/2)+(width/20)*3;
        C1.width = width;
        C1.height = (width/20);
        C1.text = "▶ " + Datas[4];
        if(C1.text.substring(C1.text.length-2)==" ✓") C1.color = "red";
        scene.addChild(C1);
        C1.addEventListener('touchstart',function(e){
          if(C1.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C1.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(Datas[8],false,false);
        });
      }

      if(Datas[5]!=false){
        var C2 = new Label();
        C2.font  = (width/20)+"px monospace";
        C2.color = 'black';
        C2.x = 0;
        C2.y = (height/2)+(width/20)*5;
        C2.width = width;
        C2.height = (width/20);
        C2.text = "▶ " + Datas[5];
        if(C2.text.substring(C2.text.length-2)==" ✓") C2.color = "red";
        scene.addChild(C2);
        C2.addEventListener('touchstart',function(e){
          if(C2.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C2.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(Datas[9],false,false);
        });
      }

      if(Datas[6]!=false){
        var C3 = new Label();
        C3.font  = (width/20)+"px monospace";
        C3.color = 'black';
        C3.x = 0;
        C3.y = (height/2)+(width/20)*7;
        C3.width = width;
        C3.height = (width/20);
        C3.text = "▶ " + Datas[6];
        if(C3.text.substring(C3.text.length-2)==" ✓") C3.color = "red";
        scene.addChild(C3);
        C3.addEventListener('touchstart',function(e){
          if(C3.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C3.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(Datas[10],false,false);
        });
      }

      if(Datas[7]!=false){
        var C4 = new Label();
        C4.font  = (width/20)+"px monospace";
        C4.color = 'black';
        C4.x = 0;
        C4.y = (height/2)+(width/20)*9;
        C4.width = width;
        C4.height = (width/20);
        C4.text = "▶ " + Datas[7];
        if(C4.text.substring(C4.text.length-2)==" ✓") C4.color = "red";
        scene.addChild(C4);
        C4.addEventListener('touchstart',function(e){
          if(C4.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C4.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log("Scene数",Scene_kazu);
          }
          else Scene_loads(Datas[11],false,false);
        });
      }

      if(Datas[12]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return1 = new Sprite(xxx,yyy);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.scaleX = ((width/5)/xxx);
        Return1.scaleY = (((width/20))/yyy);
        Return1.x = (Return1.scaleX*xxx/2)-xxx/2;
        Return1.y = (Return1.scaleY*yyy/2)-yyy/2+height-Return1.scaleY*yyy;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[12],true,false);
        });
      } //戻る1

      if(Datas[13]!=false){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Return2 = new Sprite(xxx,yyy);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.scaleX = ((width/5)/xxx);
        Return2.scaleY = (((width/20))/yyy);
        Return2.x = (Return2.scaleX*xxx/2)-xxx/2+(width/5)*1;
        Return2.y = (Return2.scaleY*yyy/2)-yyy/2+height-Return2.scaleY*yyy;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],true,false);
        });
      }//戻る2

      if(Datas[14]!=false&&Datas[14]!="ゲームオーバー"){
        var xxx = core.assets["image/Buttons.png"].width/8;
        var yyy = core.assets["image/Buttons.png"].height;
        var Settings = new Sprite(xxx,yyy);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.scaleX = ((width/5)/xxx);
        Settings.scaleY = (((width/20))/yyy);
        Settings.x = (Settings.scaleX*xxx/2)-xxx/2+(width/5)*2;
        Settings.y = (Settings.scaleY*yyy/2)-yyy/2+height-Settings.scaleY*yyy;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[14],false));
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
      C_name.y = Background.height+(width/20)*1;
      C_name.width = width;
      C_name.height = (width/20);
      C_name.text = "【" + Datas[1] + "】";
      scene.addChild(C_name);//キャラ名

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (width/20)+"px monospace";
          this.color = 'black';
          this.x = (width/25);
          this.y = Numbers;
          this.width = width;
          this.height = (width/20);
          this.text = a;
          Numbers += 100;
          scene.addChild(this);
        }
      });//テキスト

      var Text = Datas[2].split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button1 = new Sprite(xxx,yyy);
      Button1.image = core.assets["image/Buttons.png"];
      Button1.scaleX = ((width/5)/xxx);
      Button1.scaleY = (((width/20))/yyy);
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
        Button2.scaleY = (((width/20))/yyy);
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
      Button3.scaleY = (((width/20))/yyy);
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
      Button4.scaleY = (((width/20))/yyy);
      Button4.x = (Button4.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Button4.y = (Button4.scaleY*yyy/2)-yyy/2+height-Button4.scaleY*yyy;
      Button4.frame = 5;
      scene.addChild(Button4);
      Button4.addEventListener('touchstart',function(e){
        Scene_loads(Datas[6],true,false);
      });//進む

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Button5 = new Sprite(xxx,yyy);
      Button5.image = core.assets["image/Buttons.png"];
      Button5.scaleX = ((width/5)/xxx);
      Button5.scaleY = (((width/20))/yyy);
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
      Text[3] = new Texts("▶ セーブ方法の切り替え");
      Text[4] = new Texts("▶ セーブデータ読み込み");
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
      Round.x = Man.x+(Round.scaleX*xxx/2)-xxx/2;
      Round.y = Man.y+(Round.scaleY*yyy/2)-yyy/2;
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
              if(Round.x == Man.x+(Round.scaleX*xxx/2)-xxx/2){
                Flag[0] = S_Input2._element.value;
                Flag[0] = S_Input2._element.value;
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
                  Item_Flag[Item_Flag.length] = [S_Input._element.value,"チートで生み出したアイテム。"];
                  Sound_ON("Item",true);
                  Text12.text = S_Input._element.value;
                  scene.addChild(Text12);
                  return;
                }
                else if(S_Input2._element.value=="チート体力"){
                  Flag[6] = S_Input._element.value*1;
                  Sound_ON("Item",true);
                  Text12.text = "残り回数 = "+S_Input._element.value;
                  scene.addChild(Text12);
                  return;
                }
                else if(S_Input2._element.value=="チートフラグ"){
                  for (var i = 10; i < Flag.length; i++){
                    if(Flag[i]==S_Input._element.value){
                      Flag[i] = false;
                      Text12.text = S_Input._element.value+" 消去";
                      scene.addChild(Text12);
                      return;
                    }
                  }
                  Flag[Flag.length] = S_Input._element.value;
                  Sound_ON("Item",true);
                  Text12.text = S_Input._element.value;
                  scene.addChild(Text12);
                  return;
                }
                Flag[2] = "男";
                if(S_Input._element.value=="") Flag[1] = "若辻";
                if(S_Input2._element.value=="") Flag[0] = "俛人";
              }
              else{
                Flag[2] = "女";
                if(S_Input._element.value=="") Flag[1] = "防人";
                if(S_Input2._element.value=="") Flag[0] = "玲奈";
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
        Scene_loads("調べる何もない",false,Item);
      });

      var Touchs = Class.create(Sprite, {
        initialize: function(x,y,width,height,Number){
          Sprite.call(this,width,height);
          this.x = x;
          this.y = y;
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
      Text.y = Background.height+(width/20)*1;
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

      var Text = b.split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var xxx = core.assets["image/Buttons.png"].width/8;
      var yyy = core.assets["image/Buttons.png"].height;
      var Enter1 = new Sprite(xxx,yyy);
      Enter1.image = core.assets["image/Buttons.png"];
      Enter1.scaleX = ((width/5)/xxx);
      Enter1.scaleY = (((width/20))/yyy);
      Enter1.x = (Enter1.scaleX*xxx/2)-xxx/2+(width/5)*3;
      Enter1.y = (Enter1.scaleY*yyy/2)-yyy/2+height-Enter1.scaleY*yyy;
      Enter1.frame = 5;
      scene.addChild(Enter1);

      var xxx = core.assets["image/アイテム/"+a+".png"].width;
      var yyy = core.assets["image/アイテム/"+a+".png"].height;
      var Item = new Sprite(xxx,yyy);
      Item.scaleX = ((width/2)/xxx);
      Item.scaleY = ((width/2)/yyy);
      Item.image = core.assets["image/アイテム/"+a+".png"];
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
          Scene_loads(c,true,false);
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
          Scene_loads(c,true,false);
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
        scene.addChild(Text21);
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
              var xxx = core.assets["image/アイテム/"+a+".png"].width;
              var yyy = core.assets["image/アイテム/"+a+".png"].height;
              Sprite.call(this,xxx,yyy);
              this.scaleX = ((width/4)/xxx);
              this.scaleY = ((width/4)/yyy);
              this.image = core.assets["image/アイテム/"+a+".png"];
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
          var Syousai_text = a[1].split("(改行)");
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
          if(Ig==Choice_Item){
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
          Get_I_C_F("アイテム",Choice_Item,Item[i].text2+"(改行)"+Item[i].text3+"(改行)"+Item[i].text4+"(改行)"+Item[i].text5,Item[i].image_f,"停止");
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="■ 停止"){
          Sound_ON(Choice_Item,false);
          for (var i = 0; i < Item_Flag.length; i++) {
            if(Item_Flag[i][0]==Choice_Item) break;
          }
          Get_I_C_F("アイテム",Choice_Item,Item[i].text2+"(改行)"+Item[i].text3+"(改行)"+Item[i].text4+"(改行)"+Item[i].text5,Item[i].image_f,"再生");
          core.popScene();
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="▶ 調べる"){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Inspect_loads(Number,Choice_Item);
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
        scene.addChild(Text21);
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
              var xxx = core.assets["image/人物/詳細/"+a+".png"].width;
              var yyy = core.assets["image/人物/詳細/"+a+".png"].height;
              Sprite.call(this,xxx,yyy);
              this.scaleX = ((width/4)/xxx);
              this.scaleY = ((width/4)/yyy);
              this.image = core.assets["image/人物/詳細/"+a+".png"];
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
          var Syousai_text = a[1].split("(改行)");
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
          Get_I_C_F("人物",Choice_Character,Character[i].text2+"(改行)"+Character[i].text3+"(改行)"+Character[i].text4+"(改行)"+Character[i].text5,Character[i].image_f,"停止");
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
        }
        else if(this.text=="■ 停止"){
          Sound_ON(Choice_Character,false);
          for (var i = 0; i < Character_Flag.length; i++) {
            if(Character_Flag[i][0]==Choice_Character) break;
          }
          Get_I_C_F("人物",Choice_Character,Character[i].text2+"(改行)"+Character[i].text3+"(改行)"+Character[i].text4+"(改行)"+Character[i].text5,Character[i].image_f,"再生");
          core.popScene();
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

      var Item = new Sprite(1200,1200);
      Item.image = core.assets["image/アイテム詳細/"+Number+".png"];
      Item.x = (width/8);
      Item.y = 275;
      scene.addChild(Item);

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    };
    var SoundScene = function(){
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
          this.x = (height/2);
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

      var Background = new Sprite(width,height);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = (width/20)+"px monospace";
      Text.color = 'black';
      Text.x = (width/8);
      Text.y = (height/8);
      Text.width = width;
      Text.height = (width/20);
      Text.text = "データを消去する？";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = (width/20)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/8);
      Text2.y = 500;
      Text2.width = width;
      Text2.height = (width/20);
      Text2.text = "▶ はい";
      scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = (width/20)+"px monospace";
      Text3.color = 'black';
      Text3.x = (width/8);
      Text3.y = (width/16)*9;
      Text3.width = width;
      Text3.height = (width/20);
      Text3.text = "▶ いいえ";
      scene.addChild(Text3);

      Text2.addEventListener('touchstart',function(e){
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

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      return scene;
    }

    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
