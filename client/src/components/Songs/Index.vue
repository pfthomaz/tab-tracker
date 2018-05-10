<template>
  <v-layout>
    <v-flex xs6
      v-if="isUserLoggedIn">
      <songs-bookmarks></songs-bookmarks>
      <recently-viewed-songs class="mt-2"></recently-viewed-songs>
    </v-flex>
    <v-flex :class="{
      xs12: !isUserLoggedIn,
      xs6: isUserLoggedIn
    }"
      class="ml-2">
      <songs-search-panel></songs-search-panel>
      <songs-panel class="mt-2"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import SongsPanel from "./SongsPanel";
import SongsBookmarks from "./SongsBookmarks";
import RecentlyViewedSongs from "./RecentlyViewedSongs";
import SongsSearchPanel from "./SongsSearchPanel";
import SongsService from "@/services/SongsService";
export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  data () {
    return {
      songs: []
    };
  },
  async mounted () {
    // do a request to the backend for all the songs
    this.songs = (await SongsService.index()).data;
    // console.log("songs", this.songs);
  }
};
</script>

<style>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
