<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex xs6
        class="ml-2">
        <you-tube :youtubeId="song.youtubeId" />
      </v-flex>

    </v-layout>

    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :song="song"></tab>
      </v-flex>

      <v-flex xs6
        class="ml-2">
        <lyrics :song="song"></lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongMetadata from "./SongMetadata";
import YouTube from "./YouTube";
import Lyrics from "./Lyrics";
import Tab from "./Tab";
import SongsService from "@/services/SongsService";
import SongHistoryService from "@/services/SongHistoryService";

export default {
  data () {
    return {
      song: {}
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "user",
      "route"
    ])
  },
  async mounted () {
    const songId = this.route.params.songId;
    console.log('songId ', songId);

    this.song = (await SongsService.show(songId)).data;

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: Number(songId)
      });
    }
  },
  components: {
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
};
</script>

<style>

</style>
