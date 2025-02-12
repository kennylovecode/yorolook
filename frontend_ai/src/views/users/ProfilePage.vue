<script setup lang="ts">
import { useProfileStore } from "@/stores/profileStore";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "~/src/stores/authStore";
const { user } = storeToRefs(useAuthStore());

const typeRankTitle = computed((()=>{
  const currentType = user.value.types?.find(x => x.id === user.value.type_id);
  const currentRank = user.value.ranks?.find(x => x.type_id === user.value.type_id)
  if(currentRank && currentType)
    return `${currentRank.type_rank?.title}${currentType?.title} ${currentRank?.expired_time||''}`;
  return ''
}))

const passwordForm = reactive({
  password:"",
  confirm: ""
})
const passwordShow = ref(false)
const passwordRules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters'
}

onMounted(() => {
});
</script>

Basic with Icons
<template>
  <v-sheet elevation="0" class="mx-auto mt-6 pa-6" color="transparent" max-width="1600">
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <div class="d-flex flex-column pa-10">
            <v-avatar size="120" class="mx-auto elevation-12" color="white">
              <v-img :src="user.profile?.avatar"> </v-img>
            </v-avatar>
            <div class="text-center mt-5">
              <h3 class="text-h6 font-weight-bold">
                {{ user.username }}
                <v-chip size="small" class="font-weight-bold" color="blue">
                  {{ typeRankTitle }}
                </v-chip>
              </h3>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="py-5 px-10">
            <v-icon color="grey"> mdi-map-marker </v-icon>
            <span class="ml-4">{{ user.profile?.location }}</span>
          </div>

          <v-divider></v-divider>
          <div class="py-5 px-10">
            <v-icon color="grey"> mdi-email-check-outline </v-icon>
            <span class="ml-4">{{ user.email }}</span>
          </div>
          <v-divider></v-divider>

          <div class="py-5 px-10">
            <v-icon color="grey"> mdi-phone-outline </v-icon>
            <span class="ml-4">{{ user.mobile }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <!-- ---------------------------------------------- -->
        <!--   Basic Infomation -->
        <!-- ---------------------------------------------- -->
        <v-card class="mb-5">
          <v-card-title class="py-4 font-weight-bold">
            Basic Infomation
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-7">
            <v-row>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.username')  }}</v-label>
                <v-text-field v-model="user.username" color="primary" variant="outlined" density="compact" type="text"
                  placeholder="John Deo" hide-details />
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.nickname')  }}</v-label>
                <v-text-field v-model="user.profile.nickname" color="primary" variant="outlined" density="compact"
                  type="text" placeholder="John Deo" hide-details />
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.realname')  }}</v-label>
                <v-text-field v-model="user.profile.realname" color="primary" variant="outlined" density="compact"
                  type="text" placeholder="John Deo" hide-details />
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.idcard')  }}</v-label>
                <v-text-field v-model="user.profile.idcard" color="primary" variant="outlined" density="compact"
                  type="text" placeholder="John Deo" hide-details />
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.occupation')  }}</v-label>
                <v-text-field v-model="user.profile.occupation" color="primary" variant="outlined" density="compact"
                  type="text" hide-details /></v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">{{ $t('login.location')  }}</v-label>
                <v-text-field v-model="user.profile.location" color="primary" variant="outlined" density="compact"
                  type="text" hide-details /></v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn class="px-5" color="primary" elevation="1" variant="elevated">
              Unpdate Basic Info</v-btn>
          </v-card-actions>
        </v-card>

        <!-- ---------------------------------------------- -->
        <!--   Authentication  -->
        <!-- ---------------------------------------------- -->
        <v-card class="mb-5">
          <v-card-title class="py-4 font-weight-bold">
            Authentication</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-7">
            <v-row>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">Email</v-label>
                <v-text-field class="bg-blue-grey-lighten-5" readonly v-model="user.email" color="primary"
                  variant="outlined" density="compact" type="text" placeholder="John Deo" hide-details /></v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">Mobile</v-label>
                <v-text-field class="bg-blue-grey-lighten-5" readonly v-model="user.mobile" color="primary"
                  variant="outlined" density="compact" type="text" placeholder="John Deo" hide-details /></v-col>
              <v-col cols="12" md="6">
                <v-btn color="primary" size="large" block elevation="1" variant="elevated">
                  <Icon icon="logos:google-icon" class="mr-3 my-2" />企业微信
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="primary" size="large" block elevation="1" variant="elevated">
                  <Icon icon="logos:google-icon" class="mr-3 my-2" />微信
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- ---------------------------------------------- -->
        <!--   Change Password  -->
        <!-- ---------------------------------------------- -->
        <v-card class="mb-5">
          <v-card-title class="py-4 font-weight-bold">
            Change Password
          </v-card-title>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-card-text class="pa-7">
            <v-row>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">New Password</v-label>
                <v-text-field v-model="passwordForm.password" color="primary" variant="outlined" density="compact"
                  hide-details :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="passwordShow ? 'text' : 'password'"
                   @click:append="passwordShow = !passwordShow"
                  /></v-col>
              <v-col cols="12" sm="6">
                <v-label class="font-weight-medium mb-2">Confirm New Password</v-label>
                <v-text-field v-model="passwordForm.confirm" color="primary" variant="outlined" density="compact"
                  hide-details :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="passwordShow ? 'text' : 'password'"
                  @click:append="passwordShow = !passwordShow" /></v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn class="px-5" color="primary" elevation="1" variant="elevated">
              Unpdate Password</v-btn>
          </v-card-actions>
        </v-card>

        <!-- ---------------------------------------------- -->
        <!--   Notifications  -->
        <!-- ---------------------------------------------- -->
        <v-card class="mb-5">
          <v-card-title class="py-4 font-weight-bold">
            Notifications</v-card-title>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn class="px-5" color="primary" elevation="1" variant="elevated">
              Unpdate Notifications</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
