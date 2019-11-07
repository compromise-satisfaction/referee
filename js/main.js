enchant()

function Load(width,height){
  var core = new Core(width, height);
  core.preload("sound/Item.wav");
  core.preload("image/left.png");
  core.preload("image/Round.png");
  core.preload("image/title.png");
  core.preload("image/right.png");
  core.preload("image/white.png");
  core.preload("image/Item_B.png");
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
  core.preload("image/背景/right.png");
  core.preload("image/Background.png");
  core.preload("image/Characters.png");
  core.preload("image/Test_stand.png");
  core.preload("image/Transparent.png");
  core.preload("image/Trophies_image.png");
  core.preload("image/背景/Test_stand.png");
  for (var i = 0; i <= 1; i++){
    core.preload("image/背景/"+i+".png");
  }
  core.fps = 100;
  core.onload = function(){

    function rand(n) {
      return Math.floor(Math.random() * (n + 1));
    }

    function Scene_loads(Number,Return,Flag,Item){
      var Name = window.localStorage.getItem("name");
      var Gender = window.localStorage.getItem("gender");
      var Surname = window.localStorage.getItem("surname");
      if(Gender=="男"){
        var www = ["僕","俺"];
        var Person = www[rand(1)];
        var S_image = 4;
      }
      else{
        var Person = "私";
        var S_image = 6;
      }
      if(Number=="セーブ読み込み"){
        Number = window.localStorage.getItem("Number")*1;
        Flag = window.localStorage.getItem("flag").split(",");
        for (var i = 4; i < Flag.length; i++){
          if(Flag[i]=="true") Flag[i] = true;
          else Flag[i] = false;
        }
        Flag[0] = Flag[0]*1;//体力
        Flag[1] = Flag[1]*1;//今どの尋問Sceneか
        Flag[2] = Flag[2]*1;//戻るScene
        Flag[3] = Flag[3]*1;//スキップScene
      }
      console.log(Number);
      if(Item){
          Number = Item+Number;
      }
      switch (Number) {
        case -1:
          var Text = "自力でやれ";
          Datas = [0,0,0,0,0,0,0,0,"",Text,Number+1,0,0,0,"ゲームオーバー",0,0];
          core.replaceScene(MainScene(Datas,Return));
          break;
        case 1:
          var Flag = [5,1,true];
          var Text = Person+"の名前は"+ Surname + Name +"。最近弁護士になったばかりの新入りだ。";
          window.localStorage.setItem("syoken",false);
          Data = true;
          Datas = [0,0,0,0,0,0,0,0,"",Text,0,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 2:
          var Text = "まだ先輩についての見習いに過ぎないがいずれは自分自身で法廷に立つことを目標にして聖ヶ丘法律事務所にお世話になって色々な慣例等を学びつつ日々の雑務をこなしている。";
          Datas = [0,0,0,0,0,0,0,0,"",Text,0,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 3:
          var Text = "「おはようございます」";
          Datas = [1,0,S_image,15,0,0,0,0,Surname+" "+Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 4:
          var Text = "事務所の扉を開け、中にいる人物に挨拶する。";
          Datas = [1,0,S_image,0,0,0,0,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 5:
          var T_Name = "聖ヶ丘 剣哉";
          var Text = "「ああ、おはよう"+Surname+"くん」";
          Datas = [1,0,S_image,0,0,0,1,15,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 6:
          var Text = "机に座り書類を処理しながら反応するのは男性にしては長めの髪型をした壮年の男性ー"+Person+"がお世話になっているこの法律事務所の所長、聖ヶ丘 剣哉 だ";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 7:
          var Text = "「所長、"+Person+"に用件があるとお聞きしたのですが一体何の御用でしょう？」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 8:
          var Text = "所長のデスクに近づき質問をぶつけると所長は書類から顔をあげ腕を口の前で構え眼光鋭く真剣な顔で答え始める。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 9:
          var T_Name = "聖ヶ丘";
          var Text = "「うむ、その前に埼律君の担当していた事件は知っているかね？」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 10:
          var Text = "「はい、"+Person+"も先輩の手伝いで資料を纏めていたので知ってはいますが」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 11:
          var T_Name = "聖ヶ丘";
          var Text = "「その事件の弁護を君にやってもらうことになった」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 12:
          var Text = "………………";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 13:
          var Text = "………………………………";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 14:
          var Text = "「はい？」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 15:
          var Text = "思わず気の抜けた返事がでてしまう。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 16:
          var Text = "ベテランの先輩の仕事をわざわざ新米の自分が横からかっさらうような事をなぜ任されるのか。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 17:
          var Text = "「御言葉ですが……その、先輩はどうなさったのですか？」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 18:
          var T_Name = "聖ヶ丘";
          var Text = "「驚くのも無理はないが、彼女は先日入院してしまってね」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 19:
          var Text = "「入院！？何があったのですか！？」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 20:
          var Text = "あの健啖家で剛健な埼律先輩が入院するなんてよっぽどの事故か病気か。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 21:
          var T_Name = "聖ヶ丘";
          var Text = "「ああ、そんなに心配する事はないよ。ただの食べ過ぎによる急性胃腸炎だそうだ」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 22:
          var Text = "そう言って所長は全く困ったものだと額に手をあてため息をつく。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 23:
          var Text = "(ああ、なるほどそう言えば週末わんこそばに挑戦するとかいってたけどそんなになるまで食べるとは……)";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 24:
          var T_Name = "聖ヶ丘";
          var Text = "「他のメンバーも全員出払っていて手の空いているのが君しかいないのだよ。君はこの事件のあらましも知っていることだし引き受けてくれないか？」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 25:
          var Text = "「確かに少しは知っておりますが、その、宜しいのですか？」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 26:
          var Text = "夢にまでみた法廷デビューがこんな形で転がって来たものの不安を隠せず問い返してしまう。";
          Datas = [1,0,S_image,0,0,0,1,0,"",Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 27:
          var T_Name = "聖ヶ丘";
          var Text = "「気にすることはないよ。君は優秀だと聞いているし私の聞いたところこの事件、勝そうだ。それに後のことは此方でキッチリフォローするから思うようにやってみたまえ」";
          Datas = [1,0,S_image,0,0,0,1,0,T_Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 28:
          var Text = "「わ、判りました。それでは準備に取りかかりますので失礼いたします」";
          Datas = [1,0,S_image,0,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 29:
          var Text = "所長の剣幕に押され了承してしまった"+Person+"は一礼し所長室を後にする。";
          Datas = [1,0,S_image,-15,0,0,1,0,Name,Text,1,Number-1,Number,Number+1,31,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 30:
          var Text = "さて、これからどうするか……";
          Datas = [0,0,0,0,0,0,0,0,"",Text,1,Number-1,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
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
          if(Flag[3]){
            C1 = "容疑者に会いに行く";
            C2 = "先輩のお見舞いに行く";
            C3 = "尋問テスト";
            C4 = "";
            S1 = 33;
            S2 = 34;
            S3 = 35;
            S4 = 0;
          }
          Datas = [0,0,0,0,C1,C2,C3,C4,S1,S2,S3,S4,1,Number-1,Number];
          core.replaceScene(ChoiceScene(Datas,Flag));
          break;
        case 32:
          Flag[3] = true;
          core.pushScene(ItemgetScene(2,"被害者概要を法廷記録にファイルした。",31,Flag));
          break;
        case 35:
          var Text = "尋問テスト開始";
          Datas = [0,0,0,0,0,0,0,0,"",Text,0,0,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 36:
          //Datas = [(キャラ,キャラ名,テキスト,ゆさぶる,前,今,次,つきつける,正解)]
          if(Flag[4]) Datas = [3,"セラ","まず、被害者は溺死です。",36.1,0,Number,Number+1,40,"被害者概要"];
          else Datas = [2,"未知の決闘者","まず、被害者は溺死よ。",36.1,0,Number,Number+1,40,"被害者概要"];
          core.replaceScene(InterrogationScene(Datas,Flag));
          break;
        case 36.1:
          var Text = "あれ？そうでしたっけ？";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,36.2,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 36.2:
          if(Flag[4]){
            Name = "セラ";
            var Text = "どうでしょうねぇ？";
            var Image = 3;
          }
          else{
            Name = "未知の決闘者";
            var Text = "なに？違うって言うの？ならば証拠を見せなさい。";
            var Image = 2;
          }
          Datas = ["Test_stand",0,0,0,Image,0,0,0,Name,Text,0,36.1,Number,37,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 37:
          if(Flag[4]) Datas = [3,"セラ","他は特にないですね。",37.1,Number-1,Number,Number+1,0,"無し"];
          else Datas = [2,"未知の決闘者","後は言う事はないわね。",37.1,Number-1,Number,Number+1,0,"無し"];
          core.replaceScene(InterrogationScene(Datas,Flag));
          break;
        case 37.1:
          var Text = "早くないですか？";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,37.2,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 37.2:
          if(Flag[4]){
            Name = "セラ";
            var Text = "テストですので。";
            var Image = 3;
          }
          else{
            Name = "未知の決闘者";
            var Text = "テストなんだからこんなものよ。";
            var Image = 2;
          }
          Datas = ["Test_stand",0,0,0,Image,0,0,0,Name,Text,0,37.1,Number,38,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38:
          if(Flag[4]) Datas = [3,"セラ","私からは以上です。",38.1,Number-1,Number,Number+1,0,"無し"];
          else Datas = [2,"未知の決闘者","私からは以上よ。",38.1,Number-1,Number,Number+1,0,"無し"];
          core.replaceScene(InterrogationScene(Datas,Flag));
          break;
        case 38.1:
          var Text = "えっと…。";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,38.2,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.2:
          var Text = "何よ。";
          if(Flag[3]) var Next = 38.21;
          else var Next = 38.3;
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,38.1,Number,Next,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.21:
          var Text = "素顔、見せてくれませんか？";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,38.1,38.2,Number,38.22,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.22:
          var Text = "…";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,38.1,38.21,Number,38.23,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.23:
          var Text = "…はい。";
          Flag[4] = true;
          Datas = ["Test_stand",0,0,0,3,0,0,0,"セラ",Text,38.1,38.22,Number,39,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.3:
          var Text = "とりあえず叫んでみました。";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,38.1,38.2,Number,38.4,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.4:
          var Text = "ふん。初心者にありがちね。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,38.1,38.3,Number,38.5,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.5:
          var Text = "その調子だと、弁護士バッジでもつきつけまくってるんでしょう。これでも持っときなさい。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,38.1,38.4,Number,38.6,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 38.6:
        Flag[3] = true;
        core.pushScene(ItemgetScene(2,"被害者概要を法廷記録にファイルした。",39,Flag));
          break;
        case 39:
          var Text = "もう一度聞き返してみよう。";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,36,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 40:
          var Text = "…これによると死因はアナフィラキシーショックですよ？";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,Number+0.1,40.4,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 40.1:
          var Text = "正解。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,Number-0.1,Number,Number+0.1,40.4,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 40.2:
          var Text = "え。";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,40,Number-0.1,Number,40.3,40.4,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 40.3:
          var Text = "今回はお試しだからね。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,40,40.2,Number,Number+0.1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 40.4:
          var Text = "clear！";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"",Text,40,Number-0.1,Number,"ゲームオーバー",0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 41:
          var Text = "これは明らかにおかしいです？";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,0,Number,Number+1,44,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 42:
          var Text = "自信なさげね。そんなんだと裁判官の心象が悪くなるわよ。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,Number-1,Number,Number+1,44,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 43:
          var Text = "今はまだ裁判長の画像がないから私が鉄槌を下してあげるわ。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,41,Number-1,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 44:
          Flag[0]--;
          var Text = "(ライフが減ったようだ…残り)"+Flag[0];
          Datas = ["right",0,S_image,0,0,0,0,0,"",Text,0,0,0,Flag[1],0,0,0];
          if(Flag[0]==0) Datas[13] = 45;
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 45:
          var Text = "そこまで！";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,0,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 46:
          var Text = "どうやらこの裁判は有罪ね。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,0,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 47:
          var Text = "\"ゲームオーバーですお疲れさまでした。\"";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"",Text,0,0,Number,"ゲームオーバー",0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case "弁護士バッジ47":
          var Text = "…？何？弁護士バッジを差し出したりして。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,0,48,49,51,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 48:
          var Text = "…？何？弁護士バッジを差し出したりして。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,0,0,Number,Number+1,51,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 49:
          var Text = "こんなの弁護士失格なので返却しようかと…";
          Datas = ["right",0,S_image,0,0,0,0,0,Name,Text,0,Number-1,Number,Number+1,51,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 50:
          var Text = "…なかなか見上げた根性ね。いいわ、ライフ＋100して上げる。";
          Datas = ["Test_stand",0,0,0,2,0,0,0,"未知の決闘者",Text,48,Number-1,Number,Number+1,0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case 51:
          Flag[0]+=100;
          var Text = "(ライフが回復した。残り)"+Flag[0];
          Datas = ["right",0,S_image,0,0,0,0,0,"",Text,0,0,0,Flag[1],0,0,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
        case "タイトルに戻る":
          core.replaceScene(TitleScene());
          break;
        case "ゲームオーバー":
          //(背景,左,中,右,C1,C2,C3,C4,1,2,3,4,前,一番前,現在)
          Datas = [0,0,0,0,"タイトルに戻る",0,0,0,"タイトルに戻る","セーブ読み込み",0,0,0,0,Number];
          if(window.localStorage.getItem("Save")=="マニュアル") Datas[5] = "セーブ読み込み";
          core.replaceScene(ChoiceScene(Datas,Flag));
          break;
          default:
            if(Item){
                Number = Number.substring(Item.length)*1;
                core.pushScene(ItemgetScene(0,"ここでは使えないようだ。",Number,Flag));
            }
            else{
              //(背景,背景時間,(キャラ番号,時間)*3,名前,文章,戻る1,戻る2,設定,スキップ,次のシーン,トロフィー,トロフィー画像
              Datas = [0,0,0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,0,"ゲームオーバー",0,0];
              core.replaceScene(MainScene(Datas,Return,Flag));
            }
            break;
      }
    }
    function Inspect_loads(Number,Flag){
      var Name = window.localStorage.getItem("name");
      var Datas = [];
      //[背景,(幅,高,x座標,y座標,名前(又は"シーンロード"),テキスト(又はシーンナンバー))×4]
      switch (Number) {
        case 137:
          Datas = [5,367,553,1219,309,"シーンロード",137.1];
          if(Flag[1]){
            Datas[0] = 55;
            Datas[6] = 137.6;
          }
          core.pushScene(InspectScene(Datas,Flag));
          break;
        default:
          Datas = [54,0,0,0,0,0,0,0,"","ここから先はできていません。",0,0,0,0,"ゲームオーバー",false,0];
          core.replaceScene(MainScene(Datas,Return,Flag));
          break;
      }
      return;
    }
    var TitleScene = function(){

      if(window.localStorage.getItem("syoken")!="false"){
        var Data = false;
        var Flag = [true];
        window.localStorage.setItem("flag",Flag);
        window.localStorage.setItem("gender","男");
        window.localStorage.setItem("name","俛人");
        window.localStorage.setItem("surname","若辻");
      }
      else var Data = true;

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
        Scene_loads(1,false,false,false);
      });

      Continuation.addEventListener('touchstart',function(e){
        if(Continuation.text == "▶ 説明") Scene_loads(-1,false,false,false);
        else Scene_loads("セーブ読み込み",false,false,false);
      });

      Clear.addEventListener('touchstart',function(e){
        core.pushScene(ClearScene());
        return;
      });

      Explanation.addEventListener('touchstart',function(e){
        Scene_loads(-1,false,false,false);
      });

      Title.addEventListener("enterframe",function(){
        if(core.input.up){
          core.popScene();
        }
      })

      return scene;
    };
    var MainScene = function(Datas,Return,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      if(window.localStorage.getItem("Save")!="マニュアル"&&Datas[12]!=false&&Datas[12]!=1){
        window.localStorage.setItem("flag",Flag);
        window.localStorage.setItem("Number",Datas[12]);
      }
      //core.assets["sound/Choice.wav"].play();
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

      if(Datas[2]!=false){
        var Character1 = new Sprite(800,900);
        Character1.image = core.assets["image/Characters.png"];
        Character1.x = 0;
        Character1.y = 0;
        Character1.frame = Datas[2];
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
        Character3.image = core.assets["image/Characters.png"];
        Character3.x = 800;
        Character3.y = 0;
        Character3.frame = Datas[6];
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

      if(Datas[4]!=false){
        var Character2 = new Sprite(800,900);
        Character2.image = core.assets["image/Characters.png"];
        Character2.x = 400;
        Character2.y = 0;
        Character2.frame = Datas[4];
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
        case "Test_stand":
        case "right":
        case "left":
          var Stand = new Sprite(1600,900);
          Stand.image = core.assets["image/"+Datas[0]+".png"];
          scene.addChild(Stand);
            break;
        default:
          break;
      }

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

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 60;
      Text.y = 1040;
      Text.width = 1480;
      Text.height = 800;
      Text.text = Datas[9];
      scene.addChild(Text);//テキスト

      if(Datas[10]!=false){
        var Return1 = new Sprite(320,60);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-65;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[10],true,Flag,false);
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
          Scene_loads(Datas[11],true,Flag,false);
        });
      }//戻る2

      if(Datas[12]!=false){
        var Settings = new Sprite(320,60);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = 640;
        Settings.y = height-65;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[12],Flag,false));
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
          Scene_loads(Datas[13],false,Flag,false);
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
          Scene_loads(Datas[14],false,Flag,false);
        });//進む2
      }

      if(Datas[15]!=false){
        if(window.localStorage.getItem(Datas[15])==undefined){
          if(Datas[12]!=false) window.localStorage.setItem(Datas[15],"獲得！");
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
          Trophies_image.frame = Datas[16];
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
          Trophies_text.text = Datas[15];
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
    var PopScene = function(Number,Type,Flag){
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
        if(Time==15){
          core.popScene();
          Scene_loads(Number,false,Flag,false);
        }
      })

      return scene;
    };
    var InterrogationScene = function(Datas,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      if(window.localStorage.getItem("Save")!="マニュアル"&&Datas[5]!=false){
        window.localStorage.setItem("flag",Flag);
        window.localStorage.setItem("Number",Datas[5]);
      }
      Flag[1] = Datas[5];
      //core.assets["sound/Choice.wav"].play();
      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/Test_stand.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);//証言席

      var Character = new Sprite(800,900);
      Character.image = core.assets["image/Characters.png"];
      Character.x = 400;
      Character.y = 0;
      Character.frame = Datas[0];
      scene.addChild(Character);//キャラ

      var Test_stand = new Sprite(1600,900);
      Test_stand.image = core.assets["image/Test_stand.png"];
      Test_stand.x = 0;
      Test_stand.y = 0;
      scene.addChild(Test_stand);//証言台

      var C_name = new Label();
      C_name.font  = "60px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = 960;
      C_name.width = 1600;
      C_name.height = 60;
      C_name.text = "【" + Datas[1] + "】";
      scene.addChild(C_name);//キャラ名

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 60;
      Text.y = 1040;
      Text.width = 1480;
      Text.height = 800;
      Text.text = Datas[2];
      scene.addChild(Text);//テキスト

        var Button1 = new Sprite(320,60);
        Button1.image = core.assets["image/Buttons.png"];
        Button1.x = 0;
        Button1.y = height-65;
        Button1.frame = 0;
        scene.addChild(Button1);
        Button1.addEventListener('touchstart',function(e){
          core.pushScene(PopScene(Datas[3],"待った！",Flag));
        });//ゆさぶる

        if(Datas[4]!=false){
          var Button2 = new Sprite(320,60);
          Button2.image = core.assets["image/Buttons.png"];
          Button2.x = 320;
          Button2.y = height-65;
          Button2.frame = 2;
          scene.addChild(Button2);
          Button2.addEventListener('touchstart',function(e){
            Scene_loads(Datas[4],true,Flag,false);
          });
        }//戻る

        var Button3 = new Sprite(320,60);
        Button3.image = core.assets["image/Buttons.png"];
        Button3.x = 640;
        Button3.y = height-65;
        Button3.frame = 3;
        scene.addChild(Button3);
        Button3.addEventListener('touchstart',function(e){
          core.pushScene(SettingScene(Datas[5],Flag));
        });//設定

        var Button4 = new Sprite(320,60);
        Button4.image = core.assets["image/Buttons.png"];
        Button4.x = 960;
        Button4.y = height-65;
        Button4.frame = 5;
        scene.addChild(Button4);
        Button4.addEventListener('touchstart',function(e){
          Scene_loads(Datas[6],true,Flag,false);
        });//進む

        var Button5 = new Sprite(320,60);
        Button5.image = core.assets["image/Buttons.png"];
        Button5.x = 1280;
        Button5.y = height-65;
        Button5.frame = 7;
        scene.addChild(Button5);
        Button5.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[7],Flag,Datas[8]));
        });//つきつける

      return scene;
    };
    var ChoiceScene = function(Datas,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      if(window.localStorage.getItem("Save")!="マニュアル"&Datas[14]!="ゲームオーバー"){
        window.localStorage.setItem("flag",Flag);
        window.localStorage.setItem("Number",Datas[14]);
      }
      //core.assets["sound/Choice.wav"].play();
      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      if(Datas[1]!=false){
        var Character1 = new Sprite(800,900);
        Character1.image = core.assets["image/Characters.png"];
        Character1.x = 0;
        Character1.y = 0;
        Character1.frame = Datas[1];
        scene.addChild(Character1);
      }//キャラ左

      if(Datas[3]!=false){
        var Character3 = new Sprite(800,900);
        Character3.image = core.assets["image/Characters.png"];
        Character3.x = 800;
        Character3.y = 0;
        Character3.frame = Datas[3];
        scene.addChild(Character3);
      }//キャラ右

      if(Datas[2]!=false){
        var Character2 = new Sprite(800,900);
        Character2.image = core.assets["image/Characters.png"];
        Character2.x = 400;
        Character2.y = 0;
        Character2.frame = Datas[2];
        scene.addChild(Character2);
      }//キャラ真ん中

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
          if(C1.text == "▶ 調べる") Inspect_loads(Datas[14],Flag);
          else Scene_loads(Datas[8],false,Flag,false);
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
          if(C2.text == "▶ 調べる") Inspect_loads(Datas[14],Flag);
          else Scene_loads(Datas[9],false,Flag,false);
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
          if(C3.text == "▶ 調べる") Inspect_loads(Datas[14],Flag);
          else Scene_loads(Datas[10],false,Flag,false);
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
          if(C4.text == "▶ 調べる") Inspect_loads(Datas[14],Flag);
          else Scene_loads(Datas[11],false,Flag,false);
        });
      }

      if(Datas[12]!=false){
        var Return1 = new Sprite(320,60);
        Return1.image = core.assets["image/Buttons.png"];
        Return1.x = 0;
        Return1.y = height-65;
        Return1.frame = 1;
        scene.addChild(Return1);
        Return1.addEventListener('touchstart',function(e){
          Scene_loads(Datas[12],true,Flag,false);
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
          Scene_loads(Datas[13],true,Flag,false);
        });
      }//戻る2

      if(Datas[14]!="ゲームオーバー"){
        var Settings = new Sprite(320,60);
        Settings.image = core.assets["image/Buttons.png"];
        Settings.x = 640;
        Settings.y = height-65;
        Settings.frame = 4;
        scene.addChild(Settings);
        Settings.addEventListener('touchstart',function(e){
          core.pushScene(ItemScene(Datas[14],Flag,false));
        });
      }

      return scene;
    };
    var SettingScene = function(Number,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      if(window.localStorage.getItem("name")==""){
        window.localStorage.setItem("name","十代")
        window.localStorage.setItem("surname","遊城")
      }

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

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      Text3.x = 200;
      Text3.y = 400;
      Text3.width = 1600;
      Text3.height = 60;
      Text3.text = "▶ セーブ方法の切り替え";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = "60px monospace";
      Text4.color = 'black';
      Text4.x = 200;
      Text4.y = 500;
      Text4.width = 1600;
      Text4.height = 60;
      if(window.localStorage.getItem("Save")=="マニュアル") Text4.text = "▶ セーブする";
      else Text4.text = "現在はオートセーブです。";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = "60px monospace";
      Text5.color = 'black';
      Text5.x = 200;
      Text5.y = 600;
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
      Text7.text = "姓";
      scene.addChild(Text7);

      var S_Input = new Entity();
      S_Input.moveTo(270,1000);
      S_Input.width = 190;
      S_Input.height = 60;
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = window.localStorage.getItem("surname");
      S_Input._element.placeholder = "姓を入力";
      scene.addChild(S_Input);

      var Text8 = new Label();
      Text8.font  = "60px monospace";
      Text8.color = 'black';
      Text8.x = 200;
      Text8.y = 1100;
      Text8.width = 1600;
      Text8.height = 60;
      Text8.text = "名";
      scene.addChild(Text8);

      var S_Input2 = new Entity();
      S_Input2.moveTo(270,1100);
      S_Input2.width = 190;
      S_Input2.height = 60;
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = window.localStorage.getItem("name");
      S_Input2._element.placeholder = "名を入力";
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
      if(window.localStorage.getItem("gender")=="女"){
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
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        core.popScene();
        core.popScene();
        Scene_loads("タイトルに戻る",false,false,false);
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("Save")=="マニュアル"){
          window.localStorage.setItem("Save","オート");
          Text4.text = "現在はオートセーブです。";
          scene.removeChild(Text5);
        }
        else{
          window.localStorage.setItem("Save","マニュアル");
          Text4.text = "▶ セーブする";
        }
        return;
      });

      Text4.addEventListener('touchstart',function(e){
        if(Text4.text == "▶ セーブする"){
          console.log(Flag);
          window.localStorage.setItem("flag",Flag);
          window.localStorage.setItem("Number",Number);
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
        window.localStorage.setItem("surname",S_Input._element.value);
        window.localStorage.setItem("name",S_Input2._element.value);
        if(Round.x == Text9.x){
          window.localStorage.setItem("gender","男");
          if(S_Input._element.value=="") window.localStorage.setItem("surname","若辻");
          if(S_Input2._element.value=="") window.localStorage.setItem("name","俛人");
        }
        else{
          window.localStorage.setItem("gender","女");
          if(S_Input._element.value=="") window.localStorage.setItem("surname","防人");
          if(S_Input2._element.value=="") window.localStorage.setItem("name","玲奈");
        }
        core.assets["sound/Item.wav"].play();
        scene.addChild(Text12);
        return;
      });

      Text13.addEventListener('touchstart',function(e){
        core.pushScene(TrophiesScene());
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

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 200;
      Text.y = 200;
      Text.width = 1600;
      Text.height = 60;
      Text.text = "▶ 戻る";
      scene.addChild(Text);

      var Text2 = new Label();
      Text2.font  = "60px monospace";
      Text2.color = 'black';
      Text2.x = 200;
      Text2.y = 400;
      Text2.width = 1600;
      Text2.height = 60;
      Text2.text = "未取得";
      if(window.localStorage.getItem("カレン強奪事件")!=undefined) Text2.text = "カレン強奪事件";
      scene.addChild(Text2);

      var Text3 = new Label();
      Text3.font  = "60px monospace";
      Text3.color = 'black';
      Text3.x = 200;
      Text3.y = 500;
      Text3.width = 1600;
      Text3.height = 60;
      Text3.text = "未取得";
      if(window.localStorage.getItem("犯行の手口")!=undefined) Text3.text = "犯行の手口";
      scene.addChild(Text3);

      var Text4 = new Label();
      Text4.font  = "60px monospace";
      Text4.color = 'black';
      Text4.x = 200;
      Text4.y = 300;
      Text4.width = 1600;
      Text4.height = 60;
      Text4.text = "未取得";
      if(window.localStorage.getItem("即決！")!=undefined) Text4.text = "即決！";
      scene.addChild(Text4);

      var Text5 = new Label();
      Text5.font  = "60px monospace";
      Text5.color = 'black';
      Text5.x = 200;
      Text5.y = 600;
      Text5.width = 1600;
      Text5.height = 60;
      Text5.text = "未取得";
      if(window.localStorage.getItem("電話")!=undefined) Text5.text = "電話";
      scene.addChild(Text5);

      var Text10 = new Label();
      Text10.font  = "60px monospace";
      Text10.color = 'black';
      Text10.x = 200;
      Text10.y = 1100;
      Text10.width = 1200;
      Text10.height = 180;
      Text10.text = "";
      scene.addChild(Text10);

      Text.addEventListener('touchstart',function(e){
        core.popScene();
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("カレン強奪事件")!=undefined){
          Text2.text = "▶ カレン強奪事件";
          Text10.text = "ラブミーティアの結成秘話。実際には噂が一人歩きしたものである。そういう意味では神話というのは正しいのかもしれない。ちなみに、カレンさんもこの話がお気に入りである。";
        }
        else{
          Text2.text = "▶ 未取得";
          Text10.text = "復習は大事。";
        }
        Text2.color = "red";
        if(window.localStorage.getItem("犯行の手口")!=undefined){
          Text3.text = "犯行の手口";
        }
        else{
          Text3.text = "未取得";
        }
        Text3.color = "black";
        if(window.localStorage.getItem("即決！")!=undefined){
          Text4.text = "即決！";
        }
        else{
          Text4.text = "未取得";
        }
        Text4.color = "black";
        if(window.localStorage.getItem("電話")!=undefined){
          Text5.text = "電話";
        }
        else{
          Text5.text = "未取得";
        }
        Text5.color = "black";
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("カレン強奪事件")!=undefined){
          Text2.text = "カレン強奪事件";
        }
        else{
          Text2.text = "未取得";
        }
        Text2.color = "black";
        if(window.localStorage.getItem("犯行の手口")!=undefined){
          Text3.text = "▶ 犯行の手口";
          Text10.text = "あいねちゃんを監視するための手段。実際にはリフレクトムーンの目撃情報の集計である。ネットリテラシーの欠片もない。";
        }
        else{
          Text3.text = "▶ 未取得";
          Text10.text = "現実ではやっちゃあ駄目だよ！ココとのお約束！";
        }
        Text3.color = "red";
        if(window.localStorage.getItem("即決！")!=undefined){
          Text4.text = "即決！";
        }
        else{
          Text4.text = "未取得";
        }
        Text4.color = "black";
        if(window.localStorage.getItem("電話")!=undefined){
          Text5.text = "電話";
        }
        else{
          Text5.text = "未取得";
        }
        Text5.color = "black";
        return;
      });

      Text4.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("カレン強奪事件")!=undefined){
          Text2.text = "カレン強奪事件";
        }
        else{
          Text2.text = "未取得";
        }
        Text2.color = "black";
        if(window.localStorage.getItem("犯行の手口")!=undefined){
          Text3.text = "犯行の手口";
        }
        else{
          Text3.text = "未取得";
        }
        Text3.color = "black";
        if(window.localStorage.getItem("即決！")!=undefined){
          Text4.text = "▶ 即決！";
          Text10.text = "実際にこれぐらいの勢いがあれば友達もっといるんだろうなぁ。";
        }
        else{
          Text4.text = "▶ 未取得";
          Text10.text = "迷ってる暇などない！";
        }
        Text4.color = "red";
        if(window.localStorage.getItem("電話")!=undefined){
          Text5.text = "電話";
        }
        else{
          Text5.text = "未取得";
        }
        Text5.color = "black";
        return;
      });

      Text5.addEventListener('touchstart',function(e){
        if(window.localStorage.getItem("カレン強奪事件")!=undefined){
          Text2.text = "カレン強奪事件";
        }
        else Text2.text = "未取得";
        Text2.color = "black";
        if(window.localStorage.getItem("犯行の手口")!=undefined){
          Text3.text = "犯行の手口";
        }
        else Text3.text = "未取得";
        Text3.color = "black";
        if(window.localStorage.getItem("即決！")!=undefined){
          Text4.text = "即決！";
        }
        else Text4.text = "未取得";
        Text4.color = "black";
        if(window.localStorage.getItem("電話")!=undefined){
          Text5.text = "▶ 電話";
          Text10.text = "夜分遅くに電話かけるのはよくないよ。あいねちゃんだから許してくれるけど。";
        }
        else{
          Text5.text = "▶ 未取得";
          Text10.text = "大事なことだけど電話ですませちゃう。しかも夜分遅くに。";
        }
        Text5.color = "red";
        return;
      });

      return scene;
    };
    var InspectScene = function(Datas,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/背景/"+ Datas[0] +".png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Background2 = new Sprite(1600,900);
      Background2.image = core.assets["image/white.png"];
      Background2.x = 0;
      Background2.y = 900;
      scene.addChild(Background2);

      if(Datas[5]!=false){
        var Background3 = new Sprite(Datas[1],Datas[2]);
        Background3.image = core.assets["image/Transparent.png"];
        Background3.x = Datas[3];
        Background3.y = Datas[4];
        scene.addChild(Background3);
        Background3.addEventListener('touchstart',function(e){
          if(Datas[5]=="シーンロード"){
            core.popScene();
            Scene_loads(Datas[6],false,Flag,false);
          }
          else core.pushScene(TextScene(Datas[5],Datas[6]));
        });
      }

      if(Datas[11]!=false){
        var Background4 = new Sprite(Datas[7],Datas[8]);
        Background4.image = core.assets["image/Transparent.png"];
        Background4.x = Datas[9];
        Background4.y = Datas[10];
        scene.addChild(Background4);
        Background4.addEventListener('touchstart',function(e){
          if(Datas[11]=="シーンロード"){
            core.popScene();
            Scene_loads(Datas[12],false,Flag,false);
          }
          else core.pushScene(TextScene(Datas[11],Datas[12]));
        });
      }

      if(Datas[17]!=false){
        var Background5 = new Sprite(Datas[13],Datas[14]);
        Background5.image = core.assets["image/Transparent.png"];
        Background5.x = Datas[15];
        Background5.y = Datas[16];
        scene.addChild(Background5);
        Background5.addEventListener('touchstart',function(e){
          if(Datas[17]=="シーンロード"){
            core.popScene();
            Scene_loads(Datas[18],false,Flag,false);
          }
          else core.pushScene(TextScene(Datas[17],Datas[18]));
        });
      }

      if(Datas[23]!=false){
        var Background6 = new Sprite(Datas[19],Datas[20]);
        Background6.image = core.assets["image/Transparent.png"];
        Background6.x = Datas[21];
        Background6.y = Datas[22];
        scene.addChild(Background6);
        Background6.addEventListener('touchstart',function(e){
          if(Datas[23]=="シーンロード"){
            core.popScene();
            Scene_loads(Datas[24],false,Flag,false);
          }
          else core.pushScene(TextScene(Data[0],Datas[23],Datas[24]));
        });
      }

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
        core.popScene();
      });

      return scene;
    };
    var ItemgetScene = function(a,b,c,Flag){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/white.png"];
      Background.x = 0;
      Background.y = 900;
      scene.addChild(Background);

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 60;
      Text.y = 1040;
      Text.width = 1480;
      Text.height = 800;
      Text.text = b;
      scene.addChild(Text);//テキスト

      var Enter = new Sprite(320,60);
      Enter.image = core.assets["image/Buttons.png"];
      Enter.x = 1280-320;
      Enter.y = height-65;
      Enter.frame = 5;
      scene.addChild(Enter);
      if(b!="ここでは使えないようだ。"){
        var Item = new Sprite(800,800);
        Item.image = core.assets["image/Item_B.png"];
        Item.x = 1600;
        Item.y = 50;
        Item.frame = a;
        scene.addChild(Item);
        core.assets["sound/Item.wav"].play();
        Item.addEventListener("enterframe",function(){
          if(Item.x!=400) Item.x -= 100;
          if(Item.x==-800){
            core.popScene();
            Scene_loads(c,true,Flag,false);
          }
        })
      }

      Enter.addEventListener('touchstart',function(e){
        if(b=="ここでは使えないようだ。") {
          core.popScene();
          Scene_loads(c,true,Flag,false);
        }
        else {
          if(Item.x>400) Item.x = 400;
          else if(Item.x==400) Item.x -= 100;
          else{
            core.popScene();
            Scene_loads(c,true,Flag,false);
          }
        }
      });//進む

      return scene;
    }
    var TextScene = function(a,b){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,900);
      Background.image = core.assets["image/white.png"];
      Background.x = 0;
      Background.y = 900;
      scene.addChild(Background);

      var C_name = new Label();
      C_name.font  = "60px monospace";
      C_name.color = 'black';
      C_name.x = 0;
      C_name.y = 960;
      C_name.width = 1600;
      C_name.height = 60;
      C_name.text = "【" + a + "】";
      if(C_name.text == "【】") C_name.text = "";
      scene.addChild(C_name);//キャラ名

      var Text = new Label();
      Text.font  = "60px monospace";
      Text.color = 'black';
      Text.x = 60;
      Text.y = 1040;
      Text.width = 1480;
      Text.height = 800;
      Text.text = b;
      scene.addChild(Text);//テキスト

      scene.on("touchstart",function(e){
        core.popScene();
      });

      return scene;
    }
    var ItemScene = function(Number,Flag,Ig){
      var scene = new Scene();                                // 新しいシーンを作る

      var Background = new Sprite(1600,1600);
      Background.image = core.assets["image/Background.png"];
      Background.x = 0;
      Background.y = 0;
      scene.addChild(Background);

      var Numbers = 400;

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
      Text1.text = "▶ 戻る";
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
      Text3.x = 1200;
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

      var Items = Class.create(Label, {
        initialize: function(a,b) {
        Label.call(this);
        this.font  = "60px monospace";
        this.color = 'black';
        this.x = 200;
        this.y = Numbers;
        this.width = 1600;
        this.height = 60;
        this.text = a;
        if(Flag[b]){
          Numbers += 100;
          scene.addChild(this);
        }
        }
      });

      var Item = [];
      var Choice_Item = "未設定";
      Item[0] = new Items("弁護士バッジ",2);
      Item[1] = new Items("被害者概要",3);

      function Item_text(a,b){
        a = a.substring(2);
        var Text = [];
        switch (a) {
          case "弁護士バッジ":
            Item_image.frame = 1;
            var Gender = window.localStorage.getItem("gender");
            if(Gender=="男"){
              var www = ["僕","俺"];
              var Person = www[rand(1)];
            }
            else var Person = "私";
            Text[0] = Person + "の身分を証明してくれる、大切なバッジだ。";
            Text[1] = "";
            Text[2] = "";
            Text[3] = "";
            return(Text[b]);
            break;
          case "被害者概要":
            Item_image.frame = 2;
            Text[0] = "被害者 清水 久太郎 しみず きゅうたろう";
            Text[1] = "27歳 会社員";
            Text[2] = "死因 アレルギー性ショック症状による心停止";
            Text[3] = "蕎麦アレルギー持ち";
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
        return;
      });

      Text2.addEventListener('touchstart',function(e){
        if(Text2.text=="▶ 設定を開く"){
          core.pushScene(SettingScene(Number,Flag));
        }
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        if(Text3.text=="▶ 使う"){
          core.popScene();
          Scene_loads(Number,true,Flag,Choice_Item);
        }
        else{
          core.popScene();
          if(Ig==Choice_Item) core.pushScene(PopScene(Number,"異議あり！",Flag));
          else core.pushScene(PopScene(41,"異議あり！",Flag));
        }
        return;
      });

      for (var i = 0; i < Item.length; i++){
        Item[i].addEventListener('touchstart',function(e){
          if(this.color=="black"){
            Choice_Item = this.text;
            this.text = "▶ " + this.text;
            this.color = "red";
            if(Ig){
              Text3.x = 1100;
              Text3.text = "▶ つきつける";
            }
            else Text3.text = "▶ 使う";
            Text4.text = Item_text(this.text,0);
            Text5.text = Item_text(this.text,1);
            Text6.text = Item_text(this.text,2);
            Text7.text = Item_text(this.text,3);
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
        Data = false;
        window.localStorage.clear();
        core.replaceScene(TitleScene());
        return;
      });

      Text3.addEventListener('touchstart',function(e){
        core.popScene();
        return;
      });

      return scene;
    }
    core.replaceScene(TitleScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  core.start()
}
