import { ref, onMounted, onUnmounted } from "vue";

export function usePlayerInfo() {
  const playerImage = ref("");
  const currentTime = ref(0); // 当前播放时间(秒)
  const totalTime = ref(0); // 总时长(秒)
  const playerSong = ref("");
  const isPlaying = ref(false);
  const lyrics = ref([]); // 歌词数组
  const currentLyricIndex = ref(-1); // 当前播放的歌词索引
  const playlist = ref([]); // 新增播放列表数组
  const currentPlayingIndex = ref(-1); // 当前播放歌曲的索引
  const playerTips = ref(""); // 添加提示信息状态
  // 将时间字符串转换为秒数
  const timeToSeconds = (timeStr) => {
    const [minutes, seconds] = timeStr.trim().split(":").map(Number);
    return minutes * 60 + seconds;
  };
  // 获取所有播放器信息
  const updatePlayerInfo = () => {
    // 获取图片
    const imgElement = document.querySelector(
      "#myhkplayer > div.myhkplayer > div.myhkblur-img > img"
    );
    if (imgElement) {
      playerImage.value = imgElement.src;
    }

    // 获取时间并转换
    const timeElement = document.querySelector(
      "#myhkplayer > div.myhkplayer > div.myhkinfo > div.timestyle > span"
    );
    if (timeElement) {
      const timeText = timeElement.textContent || "";
      // 分割并转换时间
      const [current, total] = timeText.split("/").map((t) => timeToSeconds(t));
      currentTime.value = current;
      totalTime.value = total;
    }

    // 获取歌曲信息
    const songElement = document.querySelector(
      "#mCSB_2 > div.mCSB_container > ul > li.myhknow"
    );
    if (songElement) {
      const fullText = songElement.textContent || "";
      playerSong.value = fullText
        .replace(/^\d+/, "") // 移除序号
        .replace(/(?:当前播放|暂停播放)\s*>\s*/, "") // 移除"当前播放 >"或"暂停播放 >"
        .trim();
    }
    // 获取播放状态
    const coverElement = document.querySelector(
      "#myhkplayer > div.myhkplayer > div.myhkcover"
    );
    if (coverElement) {
      isPlaying.value = coverElement.classList.contains("coverplay");
    }
    // 获取歌词
    const lrcElement = document.querySelector("#myhkLrc > ul");
    if (lrcElement) {
      const lrcItems = lrcElement.querySelectorAll("li");
      lyrics.value = Array.from(lrcItems).map((li, index) => ({
        text: li.textContent || "",
        isActive: li.classList.contains("myhknow"),
        index: index,
      }));

      // 更新当前播放的歌词索引
      let activeIndex = lyrics.value.findIndex((lyric) => lyric.isActive);
      // 如果没有找到激活的歌词，检查是否有 myhkLrc0 class
      if (activeIndex === -1 && lrcItems.length > 0) {
        if (lrcItems[0].classList.contains("myhkLrc0")) {
          activeIndex = 0;
        }
      }
      currentLyricIndex.value = activeIndex;
    } else {
      lyrics.value = [];
      currentLyricIndex.value = -1;
    }
    // 获取播放列表
    const playlistElement = document.querySelector(
      "#mCSB_2 > div.mCSB_container > ul"
    );
    if (playlistElement) {
      const listItems = playlistElement.querySelectorAll("li");
      playlist.value = Array.from(listItems).map((li, index) => ({
        text: (li.textContent || "")
          .replace(/^\d+/, "") // 移除序号
          .replace(/(?:当前播放|暂停播放)\s*>\s*/, "") // 移除"当前播放 >"或"暂停播放 >"
          .trim(),
        isPlaying: li.classList.contains("myhknow"),
        index: index,
      }));

      // 更新当前播放的歌曲索引
      const playingIndex = playlist.value.findIndex((song) => song.isPlaying);
      currentPlayingIndex.value = playingIndex;
    } else {
      playlist.value = [];
      currentPlayingIndex.value = -1;
    }
    // 获取提示信息
    const tipsElement = document.querySelector("#myhkTips");
    if (tipsElement) {
      playerTips.value = tipsElement.textContent || "";
    }
  };

  // 新增：播放指定索引的歌曲
  const playSong = (index) => {
    try {
      // 获取播放列表中的所有歌曲元素
      const playlistElement = document.querySelector(
        "#mCSB_2 > div.mCSB_container > ul"
      );
      if (playlistElement) {
        const songElements = playlistElement.querySelectorAll("li");

        // 检查索引是否有效
        if (index >= 0 && index < songElements.length) {
          // 模拟点击歌曲元素
          songElements[index].click();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("播放歌曲失败:", error);
      return false;
    }
  };

  // 创建 MutationObserver 实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" ||
        mutation.type === "childList" ||
        mutation.type === "characterData"
      ) {
        updatePlayerInfo();
      }
    });
  });

  onMounted(() => {
    // 初始化时获取信息
    updatePlayerInfo();

    // 监听元素变化
    const checkElement = setInterval(() => {
      const playerElement = document.querySelector("#myhkplayer");
      if (playerElement) {
        clearInterval(checkElement);
        // 开始观察整个播放器区域
        observer.observe(playerElement, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
        updatePlayerInfo();
      }
    }, 1000);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    playerImage,
    currentTime,
    totalTime,
    playerSong,
    isPlaying,
    lyrics,
    currentLyricIndex,
    playlist,
    currentPlayingIndex,
    playerTips,
    playSong, // 导出新增的方法
  };
}
