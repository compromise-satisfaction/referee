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
  core.preload("image/背景/Transparent.png");
  for (var i = 1; i <= 2; i++){
    core.preload("image/背景/"+i+".png");
  }
  for (var i = 1; i <= 3; i++){
    core.preload("image/アイテム/"+i+".png");
  }
  for (var i = 1; i <= 22; i++){
    core.preload("image/人物/"+i+".png");
  }
  for (var i = 0; i <= 1; i++){
    core.preload("image/アイテム詳細/"+i+".png");
  }
  for (var i = 1; i <= 8; i++){
    core.preload("image/人物/小/"+i+".png");
  }
  for (var i = 1; i <= 4; i++){
    core.preload("image/アイテム/小/"+i+".png");
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
      console.log(Number);
      return(Number);
    }


    var TitleScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る
      console.log(Flag);
      if(window.localStorage.getItem("syoken")!="false"){
        var Data = false;
      }
      else{
        var Data = true;
        BGM_Stop(true);
      }

      var Title = new Sprite(width,(width/16)*9);
      Title.image = core.assets["image/title.png"];
      Title.x = 0;
      Title.y = 0;
      scene.addChild(Title);

      var Beginning = new Label();
      Beginning.font  = (height/20)+"px monospace";
      Beginning.color = 'black';
      Beginning.x = 0;
      Beginning.y = Title.height+(height/25)*1;
      Beginning.width = width;
      Beginning.height = (height/20);
      Beginning.text = "▶ 最初から";
      scene.addChild(Beginning);

      var Continuation = new Label();
      Continuation.font  = (height/20)+"px monospace";
      Continuation.color = 'black';
      Continuation.x = 0;
      Continuation.y = Title.height+(height/25)*3;
      Continuation.width = width;
      Continuation.height = (height/20);
      Continuation.text = "▶ 説明";
      if(Data) Continuation.text = "▶ 続きから";
      scene.addChild(Continuation);

      var Explanation = new Label();
      Explanation.font  = (height/20)+"px monospace";
      Explanation.color = 'black';
      Explanation.x = 0;
      Explanation.y = Title.height+(height/25)*5;
      Explanation.width = width;
      Explanation.height = (height/20);
      Explanation.text = "▶ 説明";
      if(Data) scene.addChild(Explanation);

      var Clear = new Label();
      Clear.font  = (height/20)+"px monospace";
      Clear.color = 'black';
      Clear.x = (width/2)+(width/25)*3;
      Clear.y = Title.height+(height/25)*1;
      Clear.width = width;
      Clear.height = (height/25);
      Clear.text = "▶ データ初期化";
      if(Data) scene.addChild(Clear);

      Beginning.addEventListener('touchstart',function(e){
        if(Data) Load_Datas();
        Scene_loads(1,false,false);
        return;
      });

      Continuation.addEventListener('touchstart',function(e){
        if(Continuation.text == "▶ 説明") Scene_loads(-1,false,false);
        else Scene_loads("セーブ読み込み",false,false);
      });

      Clear.addEventListener('touchstart',function(e){
        core.pushScene(ClearScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
      });

      Explanation.addEventListener('touchstart',function(e){
        Scene_loads(-1,false,false,false);
      });

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

      var Background = new Sprite(width,(width/16)*9);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = 0;
      Background.y = 0;
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
        var Character2 = new Sprite((height/2),(width/16)*9);
        Character2.image = core.assets["image/人物/"+Datas[4]+".png"];
        Character2.x = (height/4);
        Character2.y = 0;
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
          var Stand = new Sprite(width,(width/16)*9);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[2]!=false){
        var Character1 = new Sprite((height/2),(width/16)*9);
        Character1.image = core.assets["image/人物/"+Datas[2]+".png"];
        Character1.x = 0;
        Character1.y = 0;
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
        var Character3 = new Sprite((height/2),(width/16)*9);
        Character3.image = core.assets["image/人物/"+Datas[6]+".png"];
        Character3.x = (height/2);
        Character3.y = 0;
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
          var Stand = new Sprite(width,(width/16)*9);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[15]!=undefined&&Datas[15]!=false){
        var Item = new Sprite((width/4),(width/4));
        Item.image = core.assets["image/アイテム/小/"+Datas[16]+".png"];
        Item.x = Datas[15].substring(0,4)*1;
        Item.y = Datas[15].substring(5,9)*1;
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
        C_name.font  = (height/25)+"px monospace";
        C_name.color = 'black';
        C_name.x = 0;
        C_name.y = Background.height+(height/25)*1;
        C_name.width = width;
        C_name.height = (height/25);
        C_name.text = "【" + Datas[8] + "】";
        scene.addChild(C_name);//キャラ名
      }

      var Numbers = Background.height+(height/25)*3;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/50);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          Numbers += (height/25);
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
        var Return1 = new Sprite((width/5),(height/25));
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-(height/25)-5;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[10],true,false);
        });
      } //戻る1

      if(Datas[11]!=false){
        var Return2 = new Sprite((width/5),(height/25));
        Return2.image = core.assets["image/Buttons.png"];
        Return2.x = (width/5);
        Return2.y = height-(height/25)-5;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[11],true,false);
        });
      }//戻る2

      if(Datas[12]!=false){
        var Settings = new Sprite((width/5),(height/25));
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = (width/5)*2;
        Settings.y = height-(height/25)-5;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[12],false));
          Scene_kazu++;
          console.log("Scene数",Scene_kazu);
        });
      }//アイテム画面

      if(Datas[13]!=false){
        var Enter1 = new Sprite((width/5),(height/25));
        Enter1.image = core.assets["image/Buttons.png"];
        Enter1.x = (width/5)*3;
        Enter1.y = height-(height/25)-5;
        Enter1.frame = 5;
        scene.addChild(Enter1);
        Enter1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],false,false);
        });
      }//進む1

      if(Datas[14]!=false){
        var Enter2 = new Sprite((width/5),(height/25));
        Enter2.image = core.assets["image/Buttons.png"];
        Enter2.x = (width/5)*4;
        Enter2.y = height-(height/25)-5;
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
          Trophies_text.font  = (height/25)+"px monospace";
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

      var Background = new Sprite(width,(width/16)*9);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      if(Datas[2]!=false){
        var Character2 = new Sprite((height/2),(width/16)*9);
        Character2.image = core.assets["image/人物/"+Datas[2]+".png"];
        Character2.x = (height/4);
        Character2.y = 0;
        Character2.frame = Datas[2];
        scene.addChild(Character2);
      }//キャラ真ん中

      switch (Datas[0]) {
        case "stand":
        case "留置所":
          var Stand = new Sprite(width,(width/16)*9);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[1]!=false){
        var Character1 = new Sprite((height/2),(width/16)*9);
        Character1.image = core.assets["image/人物/"+Datas[1]+".png"];
        Character1.x = 0;
        Character1.y = 0;
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var Character3 = new Sprite((height/2),(width/16)*9);
        Character3.image = core.assets["image/人物/"+Datas[3]+".png"];
        Character3.x = (height/2);
        Character3.y = 0;
        Character3.frame = Datas[3];
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "right":
        case "left":
          var Stand = new Sprite(width,(width/16)*9);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[4]!=false){
        var C1 = new Label();
        C1.font  = (height/25)+"px monospace";
        C1.color = 'black';
        C1.x = 0;
        C1.y = (height/2)+(height/25)*3;
        C1.width = width;
        C1.height = (height/25);
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
        C2.font  = (height/25)+"px monospace";
        C2.color = 'black';
        C2.x = 0;
        C2.y = (height/2)+(height/25)*5;
        C2.width = width;
        C2.height = (height/25);
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
        C3.font  = (height/25)+"px monospace";
        C3.color = 'black';
        C3.x = 0;
        C3.y = (height/2)+(height/25)*7;
        C3.width = width;
        C3.height = (height/25);
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
        C4.font  = (height/25)+"px monospace";
        C4.color = 'black';
        C4.x = 0;
        C4.y = (height/2)+(height/25)*9;
        C4.width = width;
        C4.height = (height/25);
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

      if(Datas[12]!=false&&Datas[14]!="ゲームオーバー"){
        var Return1 = new Sprite((width/5),(height/25));
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-(height/25)-5;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[12],true,false);
        });
      } //戻る1

      if(Datas[13]!=false){
        var Return2 = new Sprite((width/5),(height/25));
        Return2.image = core.assets["image/Buttons.png"];
        Return2.x = (width/5);
        Return2.y = height-(height/25)-5;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],true,false);
        });
      }//戻る2

      if(Datas[14]!=false&&Datas[14]!="ゲームオーバー"){
        var Settings = new Sprite((width/5),(height/25));
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = (width/5)*2;
        Settings.y = height-(height/25)-5;
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

      var Pop = new Sprite(width,(width/16)*9);

      Pop.image = core.assets["image/"+Type+".png"];
      Pop.x = 0;
      Pop.y = 0;
      Sound_ON(Type,true);
      scene.addChild(Pop);//異議ありOR待った

      var Time = 0;

      Pop.addEventListener("enterframe",function(){
        Time++;
        switch (Time) {
          case 2:
            Pop.x = 10;
            Pop.y = 10;
            break;
          case 3:
            Pop.x = -20;
            Pop.y = -30;
            break;
          case 4:
            Pop.x = 30;
            Pop.y = 20;
            break;
          case 15:
            core.popScene();
            Scene_kazu--;
            console.log("Scene数",Scene_kazu);
            Scene_loads(Number,false,false);
            break;
          default:
            Pop.x = 0;
            Pop.y = 0;
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

      var Background = new Sprite(width,(width/16)*9);
      Background.image = core.assets["image/背景/stand.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);//証言席

      var Character = new Sprite((height/2),(width/16)*9);
      Character.image = core.assets["image/人物/"+Datas[0]+".png"];
      Character.x = (height/4);
      Character.y = 0;
      scene.addChild(Character);//キャラ

      var Stand = new Sprite(width,(width/16)*9);
      Stand.image = core.assets["image/stand.png"];
      Stand.x = 0;
      Stand.y = 0;
      scene.addChild(Stand);//証言台

      var C_name = new Label();
      C_name.font  = (height/25)+"px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = Background.height+(height/25)*1;
      C_name.width = width;
      C_name.height = (height/25);
      C_name.text = "【" + Datas[1] + "】";
      scene.addChild(C_name);//キャラ名

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/25);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
          this.text = a;
          Numbers += 100;
          scene.addChild(this);
        }
      });//テキスト

      var Text = Datas[2].split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var Button1 = new Sprite((width/5),(height/25));
      Button1.image = core.assets["image/Buttons.png"];
      Button1.x = 0;
      Button1.y = height-(height/25)-5;
      Button1.frame = 0;
      scene.addChild(Button1);
      Button1.addEventListener('touchstart',function(e){
        core.pushScene(PopScene(Datas[3],"待った！"));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//ゆさぶる

      if(Datas[4]!=false){
        var Button2 = new Sprite((width/5),(height/25));
        Button2.image = core.assets["image/Buttons.png"];
        Button2.x = (width/5);
        Button2.y = height-(height/25)-5;
        Button2.frame = 2;
        scene.addChild(Button2);
        Button2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[4],true,false);
        });
      }//戻る

      var Button3 = new Sprite((width/5),(height/25));
      Button3.image = core.assets["image/Buttons.png"];
      Button3.x = (width/5)*2;
      Button3.y = height-(height/25)-5;
      Button3.frame = 3;
      scene.addChild(Button3);
      Button3.addEventListener('touchstart',function(e){
        core.pushScene(SettingScene(Datas[5]));
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
      });//設定

      var Button4 = new Sprite((width/5),(height/25));
      Button4.image = core.assets["image/Buttons.png"];
      Button4.x = (width/5)*3;
      Button4.y = height-(height/25)-5;
      Button4.frame = 5;
      scene.addChild(Button4);
      Button4.addEventListener('touchstart',function(e){
        Scene_loads(Datas[6],true,false);
      });//進む

      var Button5 = new Sprite((width/5),(height/25));
      Button5.image = core.assets["image/Buttons.png"];
      Button5.x = (width/5)*4;
      Button5.y = height-(height/25)-5;
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
      var Background = new Sprite(width,height);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = (height/25)+"px monospace";
      Text.color = 'black';
      Text.x = (width/8);
      Text.y = (width/8);
      Text.width = width;
      Text.height = (height/25);
      Text.text = "▶ 設定を閉じる";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = (height/25)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/8);
      Text2.y = 300;
      Text2.width = width;
      Text2.height = (height/25);
      Text2.text = "▶ タイトルに戻る";
      scene.addChild(Text2);

      var Text2_5 = new Label();
      Text2_5.font  = (height/25)+"px monospace";
      Text2_5.color = 'black';
      Text2_5.x = (width/8);
      Text2_5.y = (height/4);
      Text2_5.width = width;
      Text2_5.height = (height/25);
      Text2_5.text = "▶ サウンド設定";
      scene.addChild(Text2_5);

      var Text3 = new Label();
      Text3.font  = (height/25)+"px monospace";
      Text3.color = 'black';
      Text3.x = (width/8);
      Text3.y = 500;
      Text3.width = width;
      Text3.height = (height/25);
      Text3.text = "▶ セーブ方法の切り替え";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = (height/25)+"px monospace";
      Text4.color = 'black';
      Text4.x = (width/8);
      Text4.y = 600;
      Text4.width = width;
      Text4.height = (height/25);
      if(Flag[8]) Text4.text = "現在はオートセーブです。";
      else Text4.text = "▶ セーブする";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = (height/25)+"px monospace";
      Text5.color = 'black';
      Text5.x = (width/8);
      Text5.y = 700;
      Text5.width = width;
      Text5.height = (height/25);
      Text5.text = "セーブしました。";

      var Text6 = new Label();
      Text6.font  = (height/25)+"px monospace";
      Text6.color = 'black';
      Text6.x = (width/8);
      Text6.y = (width/16)*9;
      Text6.width = width;
      Text6.height = (height/25);
      Text6.text = "性別";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = (height/25)+"px monospace";
      Text7.color = 'black';
      Text7.x = (width/8);
      Text7.y = (height/1.6);
      Text7.width = width;
      Text7.height = (height/25);
      Text7.text = "苗字";
      scene.addChild(Text7);

      var S_Input = new Entity();
      S_Input.moveTo(330,(height/1.6));
      S_Input.width = 190;
      S_Input.height = (height/25);
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = Flag[1];
      S_Input._element.placeholder = "苗字を入力";
      scene.addChild(S_Input);

      var Text8 = new Label();
      Text8.font  = (height/25)+"px monospace";
      Text8.color = 'black';
      Text8.x = (width/8);
      Text8.y = (height/1.6)+(height/25);
      Text8.width = width;
      Text8.height = (height/25);
      Text8.text = "名前";
      scene.addChild(Text8);

      var S_Input2 = new Entity();
      S_Input2.moveTo(330,1100);
      S_Input2.width = 190;
      S_Input2.height = (height/25);
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = Flag[0];
      S_Input2._element.placeholder = "名前を入力";
      scene.addChild(S_Input2);

      var Text9 = new Label();
      Text9.font  = (height/25)+"px monospace";
      Text9.color = 'black';
      Text9.x = (height/4);
      Text9.y = (width/16)*9;
      Text9.width = width;
      Text9.height = (height/25);
      Text9.text = "男";
      scene.addChild(Text9);

      var Text10 = new Label();
      Text10.font  = (height/25)+"px monospace";
      Text10.color = 'black';
      Text10.x = 500;
      Text10.y = (width/16)*9;
      Text10.width = width;
      Text10.height = (height/25);
      Text10.text = "女";
      scene.addChild(Text10);

      var Text11 = new Label();
      Text11.font  = (height/25)+"px monospace";
      Text11.color = 'black';
      Text11.x = (width/8);
      Text11.y = 1200;
      Text11.width = width;
      Text11.height = (height/25);
      Text11.text = "▶ 設定する";
      scene.addChild(Text11);

      var Text12 = new Label();
      Text12.font  = (height/25)+"px monospace";
      Text12.color = 'black';
      Text12.x = (width/8);
      Text12.y = 1300;
      Text12.width = width;
      Text12.height = (height/25);
      Text12.text = "設定しました。";

      var Text13 = new Label();
      Text13.font  = (height/25)+"px monospace";
      Text13.color = 'black';
      Text13.x = (height/2);
      Text13.y = (width/8);
      Text13.width = width;
      Text13.height = (height/25);
      Text13.text = "▶ 獲得トロフィー";
      scene.addChild(Text13);

      var Round = new Sprite((height/25),(height/25));
      Round.image = core.assets["image/Round.png"];
      if(Flag[2]=="女"){
        Round.x = Text10.x;
        Round.y = Text10.y;
      }
      else{
        Round.x = Text9.x;
        Round.y = Text9.y;
      }
      scene.addChild(Round);

      Text.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        core.popScene();
        core.popScene();
        Scene_kazu--;
        Scene_kazu--;
        console.log("Scene数",Scene_kazu);
        Scene_loads("タイトルに戻る",false,false,false);
        return;
      });

      Text2_5.addEventListener('touchstart',function(e){
        core.pushScene(SoundScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        if(Flag[8]){
          Flag[8] = false;
          Text4.text = "▶ セーブする";
        }
        else{
          Flag[8] = true;
          Text4.text = "現在はオートセーブです。";
          scene.removeChild(Text5);
        }
        return;
      });

      Text4.addEventListener('touchstart',function(e){
        if(Text4.text == "▶ セーブする"){
          Save(Number);
          Sound_ON("Item",true);
          scene.addChild(Text5);
        }
        return;
      });

      Text9.addEventListener('touchstart',function(e){
        Round.x = Text9.x;
        Round.y = Text9.y;
        return;
      });

      Text10.addEventListener('touchstart',function(e){
        Round.x = Text10.x;
        Round.y = Text10.y;
        return;
      });

      Text11.addEventListener('touchstart',function(e){
        if(Round.x == Text9.x){
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
        Flag[1] = S_Input._element.value;
        Flag[0] = S_Input2._element.value;
        Sound_ON("Item",true);
        scene.addChild(Text12);
        return;
      });

      Text13.addEventListener('touchstart',function(e){
        core.pushScene(TrophiesScene());
        Scene_kazu++;
        console.log("Scene数",Scene_kazu);
        return;
      });

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
      Text1.font  = (height/25)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (height/25);
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (height/25)+"px monospace";
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
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
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

      var Background = new Sprite(width,(width/16)*9);
      Background.image = core.assets["image/背景/"+ Inspect[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);
      Background.addEventListener('touchstart',function(e){
        Scene_loads("調べる何もない",false,Item);
      });

      var Touchs = Class.create(Sprite, {
        initialize: function(x,y,width,height,Number){
          Sprite.call(this,width,height);
          this.x = x;
          this.y = y;
          this.image = core.assets["image/背景/Transparent.png"];
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
      Text.font  = (height/25)+"px monospace";
      Text.color = 'black';
      Text.x = 0;
      Text.y = Background.height+(height/25)*1;
      Text.width = width;
      Text.height = (height/25);
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

      var Background = new Sprite(width,(width/16)*9);
      Background.image = core.assets["image/white.png"];
      Background.x = 0;
      Background.y = (width/16)*9;
      scene.addChild(Background);

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/25);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
          this.text = a;
          Numbers += 100;
          scene.addChild(this);
        }
      });//テキスト

      var Text = b.split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var Enter = new Sprite((width/5),(height/25));
      Enter.image = core.assets["image/Buttons.png"];
      Enter.x = (width/5)*3;
      Enter.y = height-(height/25)-5;
      Enter.frame = 5;
      scene.addChild(Enter);
      var Item = new Sprite((height/2),(height/2));
      Item.image = core.assets["image/アイテム/"+a+".png"];
      Item.x = width;
      Item.y = 50;
      scene.addChild(Item);
      Sound_ON("Item",true);

      Item.addEventListener("enterframe",function(){
        if(Item.x!=(height/4)) Item.x -= 100;
        if(Item.x==-(height/2)){
          core.popScene();
          Scene_kazu--;
          console.log("Scene数",Scene_kazu);
          Scene_loads(c,true,false);
        }
      })

      Enter.addEventListener('touchstart',function(e){
        if(Item.x>(height/4)) Item.x = (height/4);
        else if(Item.x==(height/4)) Item.x -= 100;
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
      var Background = new Sprite(width,height);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (height/25)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (height/25);
      Text1.text = "▶ 閉じる";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (height/25)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/1.6);
      Text2.y = (height/8);
      Text2.width = width;
      Text2.height = (height/25);
      Text2.text = "▶ 設定を開く";

      var Text21 = new Label();
      Text21.font  = (height/25)+"px monospace";
      Text21.color = 'black';
      Text21.x = 600;
      Text21.y = (height/8);
      Text21.width = width;
      Text21.height = (height/25);
      Text21.text = "▶ 人物";

      var Text3 = new Label();
      Text3.font  = (height/25)+"px monospace";
      Text3.color = 'black';
      if(Ig) Text3.x = 1100;
      else Text3.x = 1280;
      Text3.y = 1800;
      Text3.width = 1380;
      Text3.height = (height/25);
      Text3.text = "";

      var Text4 = new Label();
      Text4.font  = (height/25)+"px monospace";
      Text4.color = 'black';
      Text4.x = (width/8);
      Text4.y = (height/1.6);
      Text4.width = width;
      Text4.height = (height/25);
      Text4.text = "";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = (height/25)+"px monospace";
      Text5.color = 'black';
      Text5.x = (width/8);
      Text5.y = 1100;
      Text5.width = width;
      Text5.height = (height/25);
      Text5.text = "";
      scene.addChild(Text5);

      var Text6 = new Label();
      Text6.font  = (height/25)+"px monospace";
      Text6.color = 'black';
      Text6.x = (width/8);
      Text6.y = 1200;
      Text6.width = width;
      Text6.height = (height/25);
      Text6.text = "";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = (height/25)+"px monospace";
      Text7.color = 'black';
      Text7.x = (width/8);
      Text7.y = 1300;
      Text7.width = width;
      Text7.height = (height/25);
      Text7.text = "";
      scene.addChild(Text7);

      var Text8 = new Label();
      Text8.font  = (height/25)+"px monospace";
      Text8.color = 'black';
      if(Ig) Text8.x = (height/2);
      else Text8.x = 980;
      Text8.y = 1800;
      Text8.width = 1380;
      Text8.height = (height/25);
      Text8.text = "";

      var Text9 = new Label();
      Text9.font  = (height/25)+"px monospace";
      Text9.color = 'black';
      Text9.x = (width/8);
      Text9.y = 1800;
      Text9.width = 1380;
      Text9.height = (height/25);
      Text9.text = "◀ 前";

      var Text10 = new Label();
      Text10.font  = (height/25)+"px monospace";
      Text10.color = 'black';
      Text10.x = 600;
      Text10.y = 1800;
      Text10.width = 1380;
      Text10.height = (height/25);
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

      var Numbers = (height/4);

      var Item_image = Class.create(Sprite,{
          initialize: function(a) {
              Sprite.call(this,(height/4),(height/4));
              this.x = (width/1.6);
              this.y = (height/4);
              this.image = core.assets["image/アイテム/小/"+a+".png"];
          }
      });

      var Items = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
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
          Numbers += 100;
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

      var Background = new Sprite(width,height);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = (height/25)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (height/25);
      Text1.text = "▶ 閉じる";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = (height/25)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/1.6);
      Text2.y = (height/8);
      Text2.width = width;
      Text2.height = (height/25);
      Text2.text = "▶ 設定を開く";
      if(Ig==false) scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = (height/25)+"px monospace";
      Text3.color = 'black';
      Text3.x = 600;
      Text3.y = (height/8);
      Text3.width = width;
      Text3.height = (height/25);
      Text3.text = "▶ アイテム";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = (height/25)+"px monospace";
      Text4.color = 'black';
      Text4.x = (width/8);
      Text4.y = (height/1.6);
      Text4.width = width;
      Text4.height = (height/25);
      Text4.text = "";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = (height/25)+"px monospace";
      Text5.color = 'black';
      Text5.x = (width/8);
      Text5.y = 1100;
      Text5.width = width;
      Text5.height = (height/25);
      Text5.text = "";
      scene.addChild(Text5);

      var Text6 = new Label();
      Text6.font  = (height/25)+"px monospace";
      Text6.color = 'black';
      Text6.x = (width/8);
      Text6.y = 1200;
      Text6.width = width;
      Text6.height = (height/25);
      Text6.text = "";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = (height/25)+"px monospace";
      Text7.color = 'black';
      Text7.x = (width/8);
      Text7.y = 1300;
      Text7.width = width;
      Text7.height = (height/25);
      Text7.text = "";
      scene.addChild(Text7);

      var Text9 = new Label();
      Text9.font  = (height/25)+"px monospace";
      Text9.color = 'black';
      Text9.x = (width/8);
      Text9.y = 1800;
      Text9.width = 1380;
      Text9.height = (height/25);
      Text9.text = "◀ 前";

      var Text10 = new Label();
      Text10.font  = (height/25)+"px monospace";
      Text10.color = 'black';
      Text10.x = 600;
      Text10.y = 1800;
      Text10.width = 1380;
      Text10.height = (height/25);
      Text10.text = "▶ 次";

      if(Character_Flag.length>5){
        scene.addChild(Text9);
        scene.addChild(Text10);
      }
      else Pages2 = 0;

      var Character_image = Class.create(Sprite,{
          initialize: function(a) {
              Sprite.call(this,(height/4),(height/4));
              this.x = (width/1.6);
              this.y = (height/4);
              this.image = core.assets["image/人物/小/"+a+".png"];
          }
      });

      var Numbers = (height/4);

      var Characters = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
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
            this.text6 = "▶ " + a[3];
            this.syousai = a[4];
          }
          else this.text6 = "";
          this.image_number = Character_Number;
          scene.addChild(this);
          Numbers += 100;
          Character_Number ++;
        }
      });

      var Character = [];
      var Image = [];
      var Character_Number = 0;

      for (var i = 0; i < 5; i++) {
        if(Character_Flag[i+Pages2]) Character[Character_Number] = new Characters(Character_Flag[i+Pages2]);
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

      Text3.addEventListener('touchstart',function(e){
        core.replaceScene(ItemScene(Number,Ig));
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
            Text4.text = this.text2;
            Text5.text = this.text3;
            Text6.text = this.text4;
            Text7.text = this.text5;
          }
          else{
            scene.removeChild(Image[this.image_number]);
            this.text = this.text.substring(2);
            this.color = "black";
            Text4.text = "";
            Text5.text = "";
            Text6.text = "";
            Text7.text = "";
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
      Text1.font  = (height/25)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (height/25);
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
      Text1.font  = (height/25)+"px monospace";
      Text1.color = 'black';
      Text1.x = (width/8);
      Text1.y = (height/8);
      Text1.width = width;
      Text1.height = (height/25);
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Numbers = (height/4);
      var Text = [];
      var Text2 = [];
      var Text_Number = 10;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (width/8);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
          this.c = Text_Number;
          this.text = "▶ "+a;
          scene.addChild(this);
          Text2[Text_Number] = new Texts2(Flag[Text_Number]);
        }
      });

      var Texts2 = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = (height/25)+"px monospace";
          this.color = 'black';
          this.x = (height/2);
          this.y = Numbers;
          this.width = width;
          this.height = (height/25);
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
      Text.font  = (height/25)+"px monospace";
      Text.color = 'black';
      Text.x = (width/8);
      Text.y = (height/8);
      Text.width = width;
      Text.height = (height/25);
      Text.text = "データを消去する？";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = (height/25)+"px monospace";
      Text2.color = 'black';
      Text2.x = (width/8);
      Text2.y = 500;
      Text2.width = width;
      Text2.height = (height/25);
      Text2.text = "▶ はい";
      scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = (height/25)+"px monospace";
      Text3.color = 'black';
      Text3.x = (width/8);
      Text3.y = (width/16)*9;
      Text3.width = width;
      Text3.height = (height/25);
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
