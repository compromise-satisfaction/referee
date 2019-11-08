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
  core.preload("image/Item_S.png");
  core.preload("sound/Choice.wav");
  core.preload("image/Buttons.png");
  core.preload("image/待った！.png");
  core.preload("sound/待った！.wav");
  core.preload("sound/Trophies.wav");
  core.preload("image/Trophies.png");
  core.preload("image/背景/left.png");
  core.preload("image/異議あり！.png");
  core.preload("sound/異議あり！.wav");
  core.preload("sound/すっごーい！.wav");
  core.preload("sound/はいよ～.wav");
  core.preload("image/背景/stand.png");
  core.preload("image/背景/Black.png");
  core.preload("image/背景/right.png");
  core.preload("image/背景/裁判長.png");
  core.preload("image/Background.png");
  core.preload("image/Trophies_image.png");
  core.preload("image/背景/Transparent.png");
  for (var i = 1; i <= 1; i++){
    core.preload("image/背景/"+i+".png");
  }
  for (var i = 1; i <= 2; i++){
    core.preload("image/アイテム/"+i+".png");
  }
  for (var i = 1; i <= 11; i++){
    core.preload("image/人物/"+i+".png");
  }
  for (var i = 0; i <= 1; i++){
    core.preload("image/アイテム詳細/"+i+".png");
  }
  core.fps = 100;
  core.onload = function(){

    function Scene_loads(Number,Return,Item){
      if(Number=="セーブ読み込み") Scene_type = Number;
      else Scene_loads2(Number,Item);
      console.log(Scene_type);
      if(Flag[9]) core.assets["sound/Choice.wav"].play();
      switch (Scene_type) {
        case "すっごーい！":
          core.assets["sound/すっごーい！.wav"].play();
          core.replaceScene(MainScene(Return));
          break;
          case "はいよ～":
            core.assets["sound/はいよ～.wav"].play();
            core.replaceScene(MainScene(Return));
            break;
          case "メイン":
            core.replaceScene(MainScene(Return));
            break;
        case "メインpush":
          core.pushScene(MainScene(Return));
          Scene_kazu++;
          console.log(Scene_kazu);
          break;
          case "調べる":
            core.replaceScene(ChoiceScene(true));
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
        case "シーンを外す":
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        break;
        case "セーブ読み込み":
        Flag = window.localStorage.getItem("Flag").split(",");
        Number = window.localStorage.getItem("Number")*1;
        Item_Flag = window.localStorage.getItem("Item").split("端");
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
        for (var i = 8; i < Flag.length; i++){
          if(Flag[i]=="true") Flag[i] = true;
          else Flag[i] = false;
        }
        for (var i = 3; i < 8; i++) {
          Flag[i] = Flag[i]*1;//3早戻し,4本線,5先送り,6体力,7アイテムページ
        }
        Pages = Flag[7];
        Scene_loads2(Number,Item);
        switch (Scene_type) {
          case "すっごーい！":
            core.assets["sound/すっごーい！.wav"].play();
            core.replaceScene(MainScene(Return));
            break;
            case "はいよ～":
              core.assets["sound/はいよ～.wav"].play();
              core.replaceScene(MainScene(Return));
              break;
            case "メイン":
              core.replaceScene(MainScene(Return));
              break;
            case "メインpush":
              core.pushScene(MainScene(Return));
              Scene_kazu++;
              console.log(Scene_kazu);
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
            case "シーンを外す":
            core.popScene();
            Scene_kazu--;
            console.log(Scene_kazu);
            break;
          }
          break;
      default:
      if(Scene_type.length==3){
        core.pushScene(ItemgetScene(Scene_type[0],Scene_type[1],Scene_type[2]));
        Scene_kazu++;
        console.log(Scene_kazu);
        return;
      }
        else if(Scene_type.substring(0,5)=="異議あり！"){
          core.pushScene(PopScene(Scene_type.substring(5)*1,"異議あり！"));
          Scene_kazu++;
          console.log(Scene_kazu);
        }
        else {
          console.log("エラー");
        }
        break;
      }
      console.log(Flag[4]);
    }

    function Inspect_loads(Number,Item){
      console.log(Number+"調べる");
      Flag[4] = Number;
      //Inspect = [背景ナンバー,(幅,高さ,x座標,y座標,シーンナンバー)*4]
      //調べるシーンを続行する場合,次はpushSceneに最後に戻るように。
      switch (Number) {
        case 20009:
          var Inspect = [1,367,553,1219,309,true,1138,158,567,0,333,true,1144];
          core.replaceScene(InspectScene(Inspect,false));
          Scene_kazu++;
          console.log(Scene_kazu);
          break;
        default:
          Inspect = ["Black",1600,900,0,0,"しない","未設定"];
          core.pushScene(InspectScene(Inspect,false));
          Scene_kazu++;
          console.log(Scene_kazu);
          break;
      }
      return;
    }

    var TitleScene = function(){

      if(window.localStorage.getItem("syoken")!="false"){
        var Data = false;
      }
      else{
        var Data = true;
        Flag = window.localStorage.getItem("Flag").split(",");
        Number = window.localStorage.getItem("Number")*1;
        Item_Flag = window.localStorage.getItem("Item").split("端");
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
        for (var i = 8; i < Flag.length; i++){
          if(Flag[i]=="true") Flag[i] = true;
          else Flag[i] = false;
        }
        for (var i = 3; i < 8; i++) {
          Flag[i] = Flag[i]*1;//3早戻し,4本線,5先送り,6体力,7アイテムページ
        }
        Pages = Flag[7];
      }

      var scene = new Scene();                                // 新しいシーンを作る

      var Title = new Sprite(1600,900);
      Title.image = core.assets["image/title.png"];
      Title.x = 0;
      Title.y = 0;
      scene.addChild(Title);

      var Beginning = new Label();
      Beginning.font  = "60px monospace";
      Beginning.color = 'black';
      Beginning.x = 0;
      Beginning.y = 960;
      Beginning.width = 1600;
      Beginning.height = 60;
      Beginning.text = "▶ 最初から";
      scene.addChild(Beginning);

      var Continuation = new Label();
      Continuation.font  = "60px monospace";
      Continuation.color = 'black';
      Continuation.x = 0;
      Continuation.y = 1040;
      Continuation.width = 1600;
      Continuation.height = 60;
      Continuation.text = "▶ 説明";
      if(Data) Continuation.text = "▶ 続きから";
      scene.addChild(Continuation);

      var Explanation = new Label();
      Explanation.font  = "60px monospace";
      Explanation.color = 'black';
      Explanation.x = 0;
      Explanation.y = 1120;
      Explanation.width = 1600;
      Explanation.height = 60;
      Explanation.text = "▶ 説明";
      if(Data) scene.addChild(Explanation);

      var Clear = new Label();
      Clear.font  = "60px monospace";
      Clear.color = 'black';
      Clear.x = 1000;
      Clear.y = 960;
      Clear.width = 1600;
      Clear.height = 60;
      Clear.text = "▶ データ初期化";
      if(Data) scene.addChild(Clear);

      Beginning.addEventListener('touchstart',function(e){
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
        console.log(Scene_kazu);
        return;
      });

      Explanation.addEventListener('touchstart',function(e){
        Scene_loads(-1,false,false,false);
      });

      Title.addEventListener("enterframe",function(){
        if(core.input.up){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
        }
      })

      return scene;
    };
    var MainScene = function(Return){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Datas[12]!=false){
        Flag[4] = Datas[12];
        if(Flag[8]&&Datas[12]!=1){
          Save(Datas[12]);
        }
      }

      var Background = new Sprite(1600,900);
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
        var Character2 = new Sprite(800,900);
        Character2.image = core.assets["image/人物/"+Datas[4]+".png"];
        Character2.x = 400;
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

      if(Datas[2]!=false){
        var Character1 = new Sprite(800,900);
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
        var Character3 = new Sprite(800,900);
        Character3.image = core.assets["image/人物/"+Datas[6]+".png"];
        Character3.x = 800;
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
        case "stand":
        case "right":
        case "left":
          var Stand = new Sprite(1600,900);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      if(Datas[15]!=undefined&&Datas[15]!=false){
        var Item = new Sprite(400,400);
        Item.image = core.assets["image/Item_S.png"];
        Item.x = Datas[15].substring(0,4)*1;
        Item.y = Datas[15].substring(5,9)*1;
        Item.frame = Datas[16];
        if(Return!=true&&Datas[15].substring(11,12)*1!=0){
          core.assets["sound/Choice.wav"].play();
          Item.opacity = 0;
          Item.tl.fadeIn(Datas[15].substring(11,12)*1);
        }
        scene.addChild(Item);
      }//アイテム

      var White = new Sprite(1600,900);
      White.image = core.assets["image/white.png"];
      White.x = 0;
      White.y = 900;
      scene.addChild(White);//白地

      if(Datas[8]!=""){
        var C_name = new Label();
        C_name.font  = "60px monospace";
        C_name.color = 'black';
        C_name.x = 0;
        C_name.y = 960;
        C_name.width = 1600;
        C_name.height = 60;
        C_name.text = "【" + Datas[8] + "】";
        scene.addChild(C_name);//キャラ名
      }

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = "60px monospace";
          this.color = 'black';
          this.x = 60;
          this.y = Numbers;
          this.width = 2000;
          this.height = 60;
          this.text = a;
          if(a.substring(0,1)=="("&&a.substring(a.length-1)==")") this.color = "blue";
          Numbers += 100;
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
        var Return1 = new Sprite(320,60);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-65;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[10],true,false);
        });
      } //戻る1

      if(Datas[11]!=false){
        var Return2 = new Sprite(320,60);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.x = 320;
        Return2.y = height-65;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[11],true,false);
        });
      }//戻る2

      if(Datas[12]>0){
        var Settings = new Sprite(320,60);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = 640;
        Settings.y = height-65;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[12],false));
          Scene_kazu++;
          console.log(Scene_kazu);
        });
      }//アイテム

      if(Datas[13]!=false){
        var Enter1 = new Sprite(320,60);
        Enter1.image = core.assets["image/Buttons.png"];
        Enter1.x = 960;
        Enter1.y = height-65;
        Enter1.frame = 5;
        scene.addChild(Enter1);
        Enter1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],false,false);
        });
      }//進む1

      if(Datas[14]!=false){
        var Enter2 = new Sprite(320,60);
        Enter2.image = core.assets["image/Buttons.png"];
        Enter2.x = 1280;
        Enter2.y = height-65;
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
          Trophies_text.font  = "30px monospace";
          Trophies_text.color = 'white';
          Trophies_text.x = width-453+145;
          Trophies_text.y = 90;
          Trophies_text.width = 1600;
          Trophies_text.height = 30;
          Trophies_text.opacity = 0;
          Trophies_text.tl.fadeIn(5);
          Trophies_text.text = Datas[17];
          scene.addChild(Trophies_text);
          core.assets["sound/Trophies.wav"].play();
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
    var ChoiceScene = function(Inspect){
      var scene = new Scene();                                // 新しいシーンを作る

      if(Flag[8]&&Datas[14]!="ゲームオーバー"){
        Save(Datas[14]);
      }

      Flag[4] = Datas[14];

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      if(Datas[2]!=false){
        var Character2 = new Sprite(800,900);
        Character2.image = core.assets["image/人物/"+Datas[2]+".png"];
        Character2.x = 400;
        Character2.y = 0;
        Character2.frame = Datas[2];
        scene.addChild(Character2);
      }//キャラ真ん中

      if(Datas[1]!=false){
        var Character1 = new Sprite(800,900);
        Character1.image = core.assets["image/人物/"+Datas[1]+".png"];
        Character1.x = 0;
        Character1.y = 0;
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var Character3 = new Sprite(800,900);
        Character3.image = core.assets["image/人物/"+Datas[3]+".png"];
        Character3.x = 800;
        Character3.y = 0;
        Character3.frame = Datas[3];
        scene.addChild(Character3);
      }//キャラ右

      switch (Datas[0]) {
        case "stand":
        case "right":
        case "left":
          var Stand = new Sprite(1600,900);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
          break;
        default:
          break;
      }

      var White = new Sprite(1600,900);
      White.image = core.assets["image/white.png"];
      White.x = 0;
      White.y = 900;
      scene.addChild(White);//白地

      if(Datas[4]!=false){
        var C1 = new Label();
        C1.font  = "60px monospace";
        C1.color = 'black';
        C1.x = 0;
        C1.y = 960;
        C1.width = 1600;
        C1.height = 60;
        C1.text = "▶ " + Datas[4];
        scene.addChild(C1);
        C1.addEventListener('touchstart',function(e){
          if(C1.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C1.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
          else Scene_loads(Datas[8],false,false);
        });
      }

      if(Datas[5]!=false){
        var C2 = new Label();
        C2.font  = "60px monospace";
        C2.color = 'black';
        C2.x = 0;
        C2.y = 1060;
        C2.width = 1600;
        C2.height = 60;
        C2.text = "▶ " + Datas[5];
        scene.addChild(C2);
        C2.addEventListener('touchstart',function(e){
          if(C2.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C2.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
          else Scene_loads(Datas[9],false,false);
        });
      }

      if(Datas[6]!=false){
        var C3 = new Label();
        C3.font  = "60px monospace";
        C3.color = 'black';
        C3.x = 0;
        C3.y = 1160;
        C3.width = 1600;
        C3.height = 60;
        C3.text = "▶ " + Datas[6];
        scene.addChild(C3);
        C3.addEventListener('touchstart',function(e){
          if(C3.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C3.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
          else Scene_loads(Datas[10],false,false);
        });
      }

      if(Datas[7]!=false){
        var C4 = new Label();
        C4.font  = "60px monospace";
        C4.color = 'black';
        C4.x = 0;
        C4.y = 1260;
        C4.width = 1600;
        C4.height = 60;
        C4.text = "▶ " + Datas[7];
        scene.addChild(C4);
        C4.addEventListener('touchstart',function(e){
          if(C4.text == "▶ 調べる") Inspect_loads(Datas[14],false);
          else if (C4.text == "▶ つきつける"){
            core.pushScene(ItemScene(Datas[14],"日常"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
          else Scene_loads(Datas[11],false,false);
        });
      }

      if(Datas[12]!=false&&Datas[14]!="ゲームオーバー"){
        var Return1 = new Sprite(320,60);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-65;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[12],true,false);
        });
      } //戻る1

      if(Datas[13]!=false){
        var Return2 = new Sprite(320,60);
        Return2.image = core.assets["image/Buttons.png"];
        Return2.x = 320;
        Return2.y = height-65;
        Return2.frame = 2;
        scene.addChild(Return2);
        Return2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[13],true,false);
        });
      }//戻る2

      if(Datas[14]!=false&&Datas[14]!="ゲームオーバー"){
        var Settings = new Sprite(320,60);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = 640;
        Settings.y = height-65;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[14],false));
          Scene_kazu++;
          console.log(Scene_kazu);
        });
      }
      if(Inspect){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        console.log("調べるに戻る");
        Inspect_loads(Datas[14],false);
      }
      return scene;
    };
    var PopScene = function(Number,Type){
      var scene = new Scene();                                // 新しいシーンを作る

      var Pop = new Sprite(1600,900);

      Pop.image = core.assets["image/"+Type+".png"];
      Pop.x = 0;
      Pop.y = 0;
      core.assets["sound/"+Type+".wav"].play();
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
            console.log(Scene_kazu);
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

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/stand.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);//証言席

      var Character = new Sprite(800,900);
      Character.image = core.assets["image/人物/"+Datas[0]+".png"];
      Character.x = 400;
      Character.y = 0;
      scene.addChild(Character);//キャラ

      var Stand = new Sprite(1600,900);
      Stand.image = core.assets["image/stand.png"];
      Stand.x = 0;
      Stand.y = 0;
      scene.addChild(Stand);//証言台

      var C_name = new Label();
      C_name.font  = "60px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = 960;
      C_name.width = 1600;
      C_name.height = 60;
      C_name.text = "【" + Datas[1] + "】";
      scene.addChild(C_name);//キャラ名

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = "60px monospace";
          this.color = 'black';
          this.x = 60;
          this.y = Numbers;
          this.width = 2000;
          this.height = 60;
          this.text = a;
          Numbers += 100;
          scene.addChild(this);
        }
      });//テキスト

      var Text = Datas[2].split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var Button1 = new Sprite(320,60);
      Button1.image = core.assets["image/Buttons.png"];
      Button1.x = 0;
      Button1.y = height-65;
      Button1.frame = 0;
      scene.addChild(Button1);
      Button1.addEventListener('touchstart',function(e){
        core.pushScene(PopScene(Datas[3],"待った！"));
        Scene_kazu++;
        console.log(Scene_kazu);
      });//ゆさぶる

      if(Datas[4]!=false){
        var Button2 = new Sprite(320,60);
        Button2.image = core.assets["image/Buttons.png"];
        Button2.x = 320;
        Button2.y = height-65;
        Button2.frame = 2;
        scene.addChild(Button2);
        Button2.addEventListener('touchstart',function(e){
          Scene_loads(Datas[4],true,false);
        });
      }//戻る

      var Button3 = new Sprite(320,60);
      Button3.image = core.assets["image/Buttons.png"];
      Button3.x = 640;
      Button3.y = height-65;
      Button3.frame = 3;
      scene.addChild(Button3);
      Button3.addEventListener('touchstart',function(e){
        core.pushScene(SettingScene(Datas[5]));
        Scene_kazu++;
        console.log(Scene_kazu);
      });//設定

      var Button4 = new Sprite(320,60);
      Button4.image = core.assets["image/Buttons.png"];
      Button4.x = 960;
      Button4.y = height-65;
      Button4.frame = 5;
      scene.addChild(Button4);
      Button4.addEventListener('touchstart',function(e){
        Scene_loads(Datas[6],true,false);
      });//進む

      var Button5 = new Sprite(320,60);
      Button5.image = core.assets["image/Buttons.png"];
      Button5.x = 1280;
      Button5.y = height-65;
      Button5.frame = 7;
      scene.addChild(Button5);
      Button5.addEventListener('touchstart',function(e){
        core.pushScene(ItemScene(Datas[7],Datas[8]));
        Scene_kazu++;
        console.log(Scene_kazu);
      });//つきつける

      return scene;
    };
    var SettingScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る
      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 200;
      Text.y = 200;
      Text.width = 1600;
      Text.height = 60;
      Text.text = "▶ 設定を閉じる";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 200;
      Text2.y = 300;
      Text2.width = 1600;
      Text2.height = 60;
      Text2.text = "▶ タイトルに戻る";
      scene.addChild(Text2);

      var Text2_5 = new Label();
      Text2_5.font  = "60px monospace";
      Text2_5.color = 'black';
      Text2_5.x = 200;
      Text2_5.y = 400;
      Text2_5.width = 1600;
      Text2_5.height = 60;
      if(Flag[9]) Text2_5.text = "▶ 選択音オン";
      else Text2_5.text = "▶ 選択音オフ";
      scene.addChild(Text2_5);

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      Text3.x = 200;
      Text3.y = 500;
      Text3.width = 1600;
      Text3.height = 60;
      Text3.text = "▶ セーブ方法の切り替え";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = "60px monospace";
      Text4.color = 'black';
      Text4.x = 200;
      Text4.y = 600;
      Text4.width = 1600;
      Text4.height = 60;
      if(Flag[8]) Text4.text = "現在はオートセーブです。";
      else Text4.text = "▶ セーブする";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = "60px monospace";
      Text5.color = 'black';
      Text5.x = 200;
      Text5.y = 700;
      Text5.width = 1600;
      Text5.height = 60;
      Text5.text = "セーブしました。";

      var Text6 = new Label();
      Text6.font  = "60px monospace";
      Text6.color = 'black';
      Text6.x = 200;
      Text6.y = 900;
      Text6.width = 1600;
      Text6.height = 60;
      Text6.text = "性別";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = "60px monospace";
      Text7.color = 'black';
      Text7.x = 200;
      Text7.y = 1000;
      Text7.width = 1600;
      Text7.height = 60;
      Text7.text = "苗字";
      scene.addChild(Text7);

      var S_Input = new Entity();
      S_Input.moveTo(330,1000);
      S_Input.width = 190;
      S_Input.height = 60;
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = Flag[1];
      S_Input._element.placeholder = "苗字を入力";
      scene.addChild(S_Input);

      var Text8 = new Label();
      Text8.font  = "60px monospace";
      Text8.color = 'black';
      Text8.x = 200;
      Text8.y = 1100;
      Text8.width = 1600;
      Text8.height = 60;
      Text8.text = "名前";
      scene.addChild(Text8);

      var S_Input2 = new Entity();
      S_Input2.moveTo(330,1100);
      S_Input2.width = 190;
      S_Input2.height = 60;
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = Flag[0];
      S_Input2._element.placeholder = "名前を入力";
      scene.addChild(S_Input2);

      var Text9 = new Label();
      Text9.font  = "60px monospace";
      Text9.color = 'black';
      Text9.x = 400;
      Text9.y = 900;
      Text9.width = 1600;
      Text9.height = 60;
      Text9.text = "男";
      scene.addChild(Text9);

      var Text10 = new Label();
      Text10.font  = "60px monospace";
      Text10.color = 'black';
      Text10.x = 500;
      Text10.y = 900;
      Text10.width = 1600;
      Text10.height = 60;
      Text10.text = "女";
      scene.addChild(Text10);

      var Text11 = new Label();
      Text11.font  = "60px monospace";
      Text11.color = 'black';
      Text11.x = 200;
      Text11.y = 1200;
      Text11.width = 1600;
      Text11.height = 60;
      Text11.text = "▶ 設定する";
      scene.addChild(Text11);

      var Text12 = new Label();
      Text12.font  = "60px monospace";
      Text12.color = 'black';
      Text12.x = 200;
      Text12.y = 1300;
      Text12.width = 1600;
      Text12.height = 60;
      Text12.text = "設定しました。";

      var Text13 = new Label();
      Text13.font  = "60px monospace";
      Text13.color = 'black';
      Text13.x = 800;
      Text13.y = 200;
      Text13.width = 1600;
      Text13.height = 60;
      Text13.text = "▶ 獲得トロフィー";
      scene.addChild(Text13);

      var Round = new Sprite(60,60);
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
        console.log(Scene_kazu);
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        core.popScene();
        core.popScene();
        Scene_kazu--;
        Scene_kazu--;
        console.log(Scene_kazu);
        Scene_loads("タイトルに戻る",false,false,false);
        return;
      });

      Text2_5.addEventListener('touchstart',function(e){
        if(Flag[9]){
          Flag[9] = false;
          Text2_5.text = "▶ 選択音オフ";
        }
        else{
          Flag[9] = true;
          Text2_5.text = "▶ 選択音オン";
        }
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
          core.assets["sound/Item.wav"].play();
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
        Flag[1] = S_Input._element.value;
        Flag[0] = S_Input2._element.value;
        if(Round.x == Text9.x){
          if(S_Input2._element.value=="ナンバー移動"){
            core.popScene();
            core.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log(Scene_kazu);
            Flag = [];
            Scene_loads(S_Input._element.value*1,false,false);
            return;
          }
          else if(S_Input2._element.value=="チート移動"){
            core.popScene();
            core.popScene();
            Scene_kazu--;
            Scene_kazu--;
            console.log(Scene_kazu);
            Flag = [];
            Scene_loads(S_Input._element.value,false,false);
            return;
          }
          else if(S_Input2._element.value=="フラグチート"){
            Flag[S_Input._element.value*1] = true;
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
        core.assets["sound/Item.wav"].play();
        scene.addChild(Text12);
        return;
      });

      Text13.addEventListener('touchstart',function(e){
        core.pushScene(TrophiesScene());
        Scene_kazu++;
        console.log(Scene_kazu);
        return;
      });

      return scene;
    };
    var TrophiesScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = "60px monospace";
      Text1.color = 'black';
      Text1.x = 200;
      Text1.y = 200;
      Text1.width = 1600;
      Text1.height = 60;
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 200;
      Text2.y = 1100;
      Text2.width = 1200;
      Text2.height = 180;
      Text2.text = "";
      scene.addChild(Text2);

      var Numbers = 300;

      var Texts = Class.create(Label, {
        initialize: function(a,b,c) {
          Label.call(this);
          this.font  = "60px monospace";
          this.color = 'black';
          this.x = 200;
          this.y = Numbers;
          this.width = 1600;
          this.height = 60;
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
      Text[5] = new Texts("使途","プライドを布教しよう。","ちなみに渡そうと思えば何回でも渡せる。");

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
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

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ Inspect[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);
      Background.addEventListener('touchstart',function(e){
        Scene_loads("何もない",false,Item);
      });

      var Background2 = new Sprite(1600,900);
      Background2.image = core.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = 900;
      scene.addChild(Background2);

      var Background3 = new Sprite(Inspect[1],Inspect[2]);
      Background3.image = core.assets["image/背景/Transparent.png"];
      Background3.x = Inspect[3];
      Background3.y = Inspect[4];
      scene.addChild(Background3);
      Background3.addEventListener('touchstart',function(e){
        if(Inspect[5]==false){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
        }
        Scene_loads(Inspect[6],false,Item);
      });

      var Background4 = new Sprite(Inspect[7],Inspect[8]);
      Background4.image = core.assets["image/背景/Transparent.png"];
      Background4.x = Inspect[9];
      Background4.y = Inspect[10];
      scene.addChild(Background4);
      Background4.addEventListener('touchstart',function(e){
        if(Inspect[11]==false){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
        }
        Scene_loads(Inspect[12],false,Item);
      });

      var Background5 = new Sprite(Inspect[13],Inspect[14]);
      Background5.image = core.assets["image/背景/Transparent.png"];
      Background5.x = Inspect[15];
      Background5.y = Inspect[16];
      scene.addChild(Background5);
      Background5.addEventListener('touchstart',function(e){
        if(Inspect[17]==false){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
        }
        Scene_loads(Inspect[18],false,Item);
      });

      var Background6 = new Sprite(Inspect[19],Inspect[20]);
      Background6.image = core.assets["image/背景/Transparent.png"];
      Background6.x = Inspect[21];
      Background6.y = Inspect[22];
      scene.addChild(Background6);
      Background6.addEventListener('touchstart',function(e){
        if(Inspect[23]==false){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
        }
        Scene_loads(Inspect[24],false,Item);
      });

      var C1 = new Label();
      C1.font  = "60px monospace";
      C1.color = 'black';
      C1.x = 0;
      C1.y = 960;
      C1.width = 1600;
      C1.height = 60;
      C1.text = "▶ 戻る";
      scene.addChild(C1);
      C1.addEventListener('touchstart',function(e){
        Scene_loads(Flag[4],false,Item);
      });

      return scene;
    };
    var ItemgetScene = function(a,b,c){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/white.png"];
      Background.x = 0;
      Background.y = 900;
      scene.addChild(Background);

      var Numbers = 1040;

      var Texts = Class.create(Label, {
        initialize: function(a) {
          Label.call(this);
          this.font  = "60px monospace";
          this.color = 'black';
          this.x = 60;
          this.y = Numbers;
          this.width = 2000;
          this.height = 60;
          this.text = a;
          Numbers += 100;
          scene.addChild(this);
        }
      });//テキスト

      var Text = b.split("(改行)");

      for (var i = 0; i < Text.length; i++) {
        Text[i] = new Texts(Text[i]);
      }

      var Enter = new Sprite(320,60);
      Enter.image = core.assets["image/Buttons.png"];
      Enter.x = 1280-320;
      Enter.y = height-65;
      Enter.frame = 5;
      scene.addChild(Enter);
      var Item = new Sprite(800,800);
      Item.image = core.assets["image/アイテム/"+a+".png"];
      Item.x = 1600;
      Item.y = 50;
      scene.addChild(Item);
      core.assets["sound/Item.wav"].play();
      Item.addEventListener("enterframe",function(){
        if(Item.x!=400) Item.x -= 100;
        if(Item.x==-800){
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
          Scene_loads(c,true,false);
        }
      })

      Enter.addEventListener('touchstart',function(e){
        if(Item.x>400) Item.x = 400;
        else if(Item.x==400) Item.x -= 100;
        else{
          core.popScene();
          Scene_kazu--;
          console.log(Scene_kazu);
          Scene_loads(c,true,false);
        }
      });//進む

      return scene;
    }
    var ItemScene = function(Number,Ig){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Item_image = new Sprite(400,400);
      Item_image.image = core.assets["image/Item_S.png"];
      Item_image.x = 1000;
      Item_image.y = 400;
      Item_image.frame = 0;
      scene.addChild(Item_image);

      var Text1 = new Label();
      Text1.font  = "60px monospace";
      Text1.color = 'black';
      Text1.x = 200;
      Text1.y = 200;
      Text1.width = 1600;
      Text1.height = 60;
      Text1.text = "▶ 閉じる";
      scene.addChild(Text1);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 1000;
      Text2.y = 200;
      Text2.width = 1600;
      Text2.height = 60;
      Text2.text = "▶ 設定を開く";
      if(Ig==false) scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      if(Ig) Text3.x = 1100;
      else Text3.x = 1280;
      Text3.y = 1400;
      Text3.width = 1380;
      Text3.height = 60;
      Text3.text = "";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = "60px monospace";
      Text4.color = 'black';
      Text4.x = 200;
      Text4.y = 1000;
      Text4.width = 1600;
      Text4.height = 60;
      Text4.text = "";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = "60px monospace";
      Text5.color = 'black';
      Text5.x = 200;
      Text5.y = 1100;
      Text5.width = 1600;
      Text5.height = 60;
      Text5.text = "";
      scene.addChild(Text5);

      var Text6 = new Label();
      Text6.font  = "60px monospace";
      Text6.color = 'black';
      Text6.x = 200;
      Text6.y = 1200;
      Text6.width = 1600;
      Text6.height = 60;
      Text6.text = "";
      scene.addChild(Text6);

      var Text7 = new Label();
      Text7.font  = "60px monospace";
      Text7.color = 'black';
      Text7.x = 200;
      Text7.y = 1300;
      Text7.width = 1600;
      Text7.height = 60;
      Text7.text = "";
      scene.addChild(Text7);

      var Text8 = new Label();
      Text8.font  = "60px monospace";
      Text8.color = 'black';
      if(Ig) Text8.x = 800;
      else Text8.x = 980;
      Text8.y = 1400;
      Text8.width = 1380;
      Text8.height = 60;
      Text8.text = "";
      scene.addChild(Text8);

      var Text9 = new Label();
      Text9.font  = "60px monospace";
      Text9.color = 'black';
      Text9.x = 200;
      Text9.y = 1400;
      Text9.width = 1380;
      Text9.height = 60;
      Text9.text = "◀ 前";

      var Text10 = new Label();
      Text10.font  = "60px monospace";
      Text10.color = 'black';
      Text10.x = 600;
      Text10.y = 1400;
      Text10.width = 1380;
      Text10.height = 60;
      Text10.text = "▶ 次";

      if(Item_Flag.length>5){
        scene.addChild(Text9);
        scene.addChild(Text10);
      }
      else Pages = 0;

      var Numbers = 400;

      var Items = Class.create(Label, {
        initialize: function(a) {
            Label.call(this);
            this.font  = "60px monospace";
            this.color = 'black';
            this.x = 200;
            this.y = Numbers;
            this.width = 1600;
            this.height = 60;
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
            this.image = a[2];
            if(a[3]){
              this.text6 = "▶ " + a[3];
              this.syousai = a[4];
            }
            else this.text6 = "";
            scene.addChild(this);
            Numbers += 100;
            Item_Number ++;
          }
      });

      var Item = [];
      var Choice_Item = "未設定";
      var Item_Number = 0;

      for (var i = 0; i < 5; i++) {
        if(Item_Flag[i+Pages]) Item[Item_Number] = new Items(Item_Flag[i+Pages]);
      }

      function Item_text(a,b){
        a = a.substring(2);
        switch (a) {
          case "プライド":
            Item_image.frame = 3;
            Text[0] = "そこにしかないもの／プライド";
            Text[1] = "BEST FRIENDS！";
            Text[2] = "カレン・ミライ from BEST FRIENDS！";
            Text[3] = "藤末 樹,片山将太";
            if(core.assets["sound/"+a+".wav"].onplaying){
              Text8.text = "■ 停止";
            }
            else Text8.text = "▶ 再生";
            return(Text[b]);
            break;
          case "偶然、必然。":
            Item_image.frame = 4;
            Text[0] = "Third Color：PURPLE";
            Text[1] = "BEST FRIENDS！";
            Text[2] = "かぐや from BEST FRIENDS！";
            Text[3] = "片山将太,藤末 樹";
            if(core.assets["sound/"+a+".wav"].onplaying){
              Text8.text = "■ 停止";
            }
            else Text8.text = "▶ 再生";
            return(Text[b]);
            break;
          case "永遠の灯":
            Item_image.frame = 5;
            Text[0] = "『アイカツ!』主題歌/挿入歌 2年目②";
            Text[1] = "STAR☆ANIS";
            Text[2] = "れみ･ふうり from STAR☆ANIS";
            Text[3] = "南田健吾";
            if(core.assets["sound/"+a+".wav"].onplaying){
              Text8.text = "■ 停止";
            }
            else Text8.text = "▶ 再生";
            return(Text[b]);
            break;
            case "新品で強靭な包丁":
              Item_image.frame = 8;
              Text[0] = "最強の包丁。";
              Text[1] = "どんな攻撃にも耐えられることだろう。";
              Text[2] = "";
              Text[3] = "";
              return(Text[b]);
              break;
              case "折れた包丁":
                Item_image.frame = 9;
                Text[0] = "無惨。";
                Text[1] = "これじゃあ使えもしない。";
                Text[2] = "";
                Text[3] = "";
                return(Text[b]);
                break;
          default:
            Item_image.frame = 0;
            return("開発中");
            break;
        }
      }

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        if(Text2.text=="▶ 設定を開く"){
          core.pushScene(SettingScene(Number));
          Scene_kazu++;
          console.log(Scene_kazu);
        }
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        if(this.text=="▶ 使う") Scene_loads(Number,true,Choice_Item);
        else{
          if(Ig==Choice_Item){
            core.pushScene(PopScene(Number,"異議あり！"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
          else if(Ig=="日常") Scene_loads(Number,true,Choice_Item+"つきつける");
          else{
            core.pushScene(PopScene("つきつけ失敗","異議あり！"));
            Scene_kazu++;
            console.log(Scene_kazu);
          }
        }
        return;
      });

      Text8.addEventListener('touchstart',function(e){
        if(this.text=="") return;
        else if(this.text=="▶ 再生"){
          core.assets["sound/"+Choice_Item+".wav"].onplaying = true;
          core.assets["sound/"+Choice_Item+".wav"].play();
          this.text = "■ 停止";
        }
        else if(this.text=="■ 停止"){
          core.assets["sound/"+Choice_Item+".wav"].onplaying = false;
          core.assets["sound/"+Choice_Item+".wav"].pause();
          this.text = "▶ 再生";
        }
        else if(this.text=="▶ 調べる") Inspect_loads(Number,Choice_Item);
        else {
          for (var i = 0; i < Item.length; i++) {
            if(Item[i].text.substring(2)==Choice_Item) break;
          }
          core.pushScene(DetailsScene(Item[i].syousai));
          Scene_kazu++;
          console.log(Scene_kazu);
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
            Item_image.frame = this.image;
            Choice_Item = this.text;
            this.text = "▶ " + this.text;
            this.color = "red";
            if(Ig) Text3.text = "▶ つきつける";
            else Text3.text = "▶ 使う";
            Text4.text = this.text2;
            Text5.text = this.text3;
            Text6.text = this.text4;
            Text7.text = this.text5;
            if(this.syousai!="▶ 再生") Text8.text = this.text6;
          }
          else{
            Item_image.frame = 0;
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
              Item[k].text = Item[k].text.substring(2);
              Item[k].color = "black";
            }
          }
          return;
        });
      }

      return scene;
    }
    var DetailsScene = function(Number){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text1 = new Label();
      Text1.font  = "60px monospace";
      Text1.color = 'black';
      Text1.x = 200;
      Text1.y = 200;
      Text1.width = 1600;
      Text1.height = 60;
      Text1.text = "▶ 戻る";
      scene.addChild(Text1);

      var Item = new Sprite(1200,1200);
      Item.image = core.assets["image/アイテム詳細/"+Number+".png"];
      Item.x = 200;
      Item.y = 275;
      scene.addChild(Item);

      Text1.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        return;
      });

      return scene;
    };
    var ClearScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 200;
      Text.y = 200;
      Text.width = 1600;
      Text.height = 60;
      Text.text = "データを消去する？";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 200;
      Text2.y = 500;
      Text2.width = 1600;
      Text2.height = 60;
      Text2.text = "▶ はい";
      scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      Text3.x = 200;
      Text3.y = 900;
      Text3.width = 1600;
      Text3.height = 60;
      Text3.text = "▶ いいえ";
      scene.addChild(Text3);

      Text2.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        Data = false;
        window.localStorage.clear();
        core.replaceScene(TitleScene());
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        Scene_kazu--;
        console.log(Scene_kazu);
        return;
      });

      return scene;
    }
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
