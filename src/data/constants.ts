export const INIT_TIME = Date.now();
export const ASSETS = {
      phone: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile%20phone/3D/mobile_phone_3d.png",
      play: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Play%20button/3D/play_button_3d.png",
      trophy: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
      medal: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/1st%20place%20medal/3D/1st_place_medal_3d.png",
      rocket: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png",
      fire: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png",
      laptop: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
      wand: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magic%20wand/3D/magic_wand_3d.png",
      headphone: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Headphone/3D/headphone_3d.png",
      camera: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera%20with%20flash/3D/camera_with_flash_3d.png",
      joystick: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Joystick/3D/joystick_3d.png",
      shoe: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Running%20shoe/3D/running_shoe_3d.png",
      watch: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Watch/3D/watch_3d.png",
      teddy: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Teddy%20bear/3D/teddy_bear_3d.png",
      guitar: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Guitar/3D/guitar_3d.png",
      avatars: [
        "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fox/3D/fox_3d.png",
        "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/3D/panda_3d.png",
        "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png",
        "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hatching%20chick/3D/hatching_chick_3d.png"
      ]
    };
export const REGION_MAP_COPY = [
      { main: "🗼 서울특별시", subs: ["강남구", "서초구", "송파구", "마포구", "관악구", "영등포구", "강서구", "노원구", "용산구"] },
      { main: "🏡 경기도", subs: ["성남시", "수원시", "고양시", "용인시", "화성시", "부천시", "안산시", "남양주시", "안양시"] },
      { main: "🌆 인천광역시", subs: ["연수구", "남동구", "부평구", "서구", "미추홀구", "계양구", "중구"] },
      { main: "🌾 충청도", subs: ["천안시", "청주시", "아산시", "충주시", "제천시", "공주시", "서산시", "당진시", "보령시"] },
      { main: "⛰️ 강원특별자치도", subs: ["춘천시", "원주시", "강릉시", "속초시", "동해시", "평창군"] },
      { main: "🚄 대전광역시", subs: ["유성구", "서구", "중구", "동구", "대덕구"] },
      { main: "🍃 전라도", subs: ["전주시", "광주광역시", "익산시", "군산시", "순천시", "여수시", "목포시", "나주시"] },
      { main: "🌊 경상도", subs: ["창원시", "포항시", "구미시", "진주시", "김해시", "경주시", "안동시", "거제시", "대구광역시", "울산광역시"] },
      { main: "🚢 부산광역시", subs: ["해운대구", "수영구", "동래구", "부산진구", "남구", "사하구", "연제구", "북구", "기장군"] },
      { main: "🍊 제주특별자치도", subs: ["제주시", "서귀포시"] }
    ];
export const ALL_SUB_REGIONS = REGION_MAP_COPY.flatMap(r => r.subs.map(sub => ({ main: r.main, sub })));
export const CATEGORY_MAP = [
      {
        main: "📱 전자기기",
        subs: ["스마트폰", "PC/노트북", "태블릿", "스마트워치", "음향기기", "청소기", "생활가전", "주방가전", "영상기기"]
      },
      {
        main: "🏠 홈·리빙",
        subs: ["가구", "인테리어", "조명", "생활용품", "주방/식기", "침구류", "욕실용품"]
      },
      {
        main: "✨ 패션·뷰티",
        subs: ["여성의류", "남성의류", "명품가방", "시계/쥬얼리", "신발/잡화", "기초/색조화장품", "향수/바디"]
      },
      {
        main: "👶 육아템",
        subs: ["아기옷", "장난감", "카시트", "유모차", "놀이매트", "그림책", "교육/교구"]
      },
      {
        main: "🏕 여가·취미",
        subs: ["골프", "자전거", "캠핑/낚시", "피트니스", "콘솔/PC게임", "피규어/프라모델", "음반/도서", "티켓/교환권"]
      },
      {
        main: "🐶 기타·특수",
        subs: ["반려동물 사료/간식", "펫용품", "식물/화분", "가공식품", "건강기능식품", "자동차/오토바이 용품", "기타중고물품"]
      }
    ];
export const REGION_MAP = [
      {
        main: "🗼 서울특별시",
        subs: ["강남구", "서초구", "송파구", "마포구", "관악구", "영등포구", "강서구", "노원구", "용산구"]
      },
      {
        main: "🏡 경기도",
        subs: ["성남시", "수원시", "고양시", "용인시", "화성시", "부천시", "안산시", "남양주시", "안양시"]
      },
      {
        main: "🌆 인천광역시",
        subs: ["연수구", "남동구", "부평구", "서구", "미추홀구", "계양구", "중구"]
      },
      {
        main: "🌾 충청도",
        subs: ["천안시", "청주시", "아산시", "충주시", "제천시", "공주시", "서산시", "당진시", "보령시"]
      },
      {
        main: "⛰️ 강원특별자치도",
        subs: ["춘천시", "원주시", "강릉시", "속초시", "동해시", "평창군"]
      },
      {
        main: "🚄 대전광역시",
        subs: ["유성구", "서구", "중구", "동구", "대덕구"]
      },
      {
        main: "🍃 전라도",
        subs: ["전주시", "광주광역시", "익산시", "군산시", "순천시", "여수시", "목포시", "나주시"]
      },
      {
        main: "🌊 경상도",
        subs: ["창원시", "포항시", "구미시", "진주시", "김해시", "경주시", "안동시", "거제시", "대구광역시", "울산광역시"]
      },
      {
        main: "🚢 부산광역시",
        subs: ["해운대구", "수영구", "동래구", "부산진구", "남구", "사하구", "연제구", "북구", "기장군"]
      },
      {
        main: "🍊 제주특별자치도",
        subs: ["제주시", "서귀포시"]
      }
    ];
