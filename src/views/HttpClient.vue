<template>
  <v-main>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined class="request">
            <v-app-bar flat color="white">
              <v-app-bar-nav-icon @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-app-bar-nav-icon>
              <v-app-bar-title>{{ $t('httpClient.title') }}</v-app-bar-title>
              <v-spacer></v-spacer>
              <v-tooltip>
                <template #activator="{ attr, on }">
                  <v-btn
                    icon
                    @click.stop="setPinned"
                    v-bind="attr"
                    v-on="on">
                    <v-icon>{{ isPinned ? 'mdi-pin' : 'mdi-pin-outline' }}</v-icon>
                  </v-btn>
                </template>
                {{ isPinned ? $t('basic.unPin') : $t('basic.pin') }}
              </v-tooltip>
              <v-tooltip>
                <template #activator="{ attr, on }">
                  <v-btn
                    v-bind="attr"
                    v-on="on"
                    icon
                    @click.stop="setFavorite">
                    <v-icon>{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                  </v-btn>
                </template>
                {{ isFavorite ? $t('basic.removeFromFavorites') : $t('basic.addToFavorites') }}
              </v-tooltip>
            </v-app-bar>
            <v-divider></v-divider>
            <v-card-text class="request-container">
              <v-row dense>
                <v-col cols="2">
                  <v-menu offset-y>
                    <template #activator="{ attr, on }">
                      <v-btn
                        v-on="on"
                        v-bind="attr"
                        block
                        text
                        outlined
                        class="button-height-equals-text-field">
                        {{ method }}
                        <v-icon right>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(m, index) in methodList" :key="index" @click="method = m">
                        <v-list-item-content>
                          <v-list-item-title>{{ m }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
                <v-col cols="8">
                  <v-text-field v-model="url" outlined :label="$t('httpClient.requestUrl')"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    :loading="sendingRequest"
                    @click="sendRequest"
                    text
                    block
                    outlined
                    class="button-height-equals-text-field">
                    <v-icon left>mdi-send</v-icon>
                    {{ $t('httpClient.sendRequest') }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-textarea
                v-if="method === 'POST'"
                v-model="postData"
                outlined
                :label="$t('httpClient.postData')"></v-textarea>
            </v-card-text>
            <v-card-subtitle>{{ $t('httpClient.customHeader') }}</v-card-subtitle>
            <v-card-text>
              <v-row v-for="(header, index) in customHeaders" :key="index" dense>
                <v-col cols="2">
                  <v-text-field outlined v-model="header.name" :label="$t('httpClient.fieldName')"></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field outlined v-model="header.value" :label="$t('httpClient.fieldValue')"></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    @click="addEmptyHeader"
                    outlined
                    text
                    block
                    class="button-height-equals-text-field">
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('httpClient.add') }}
                  </v-btn>
                </v-col>
                <v-col v-if="customHeaders.length > 1">
                  <v-btn
                    @click="removeHeader(index)"
                    outlined
                    text
                    block
                    class="button-height-equals-text-field">
                    <v-icon left>mdi-minus</v-icon>
                    {{ $t('httpClient.remove') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-card :key="index" v-for="(item, index) in requestHistory" outlined>
            <v-app-bar color="white" flat>
              <v-app-bar-title>{{ $t('httpClient.requestHistory') }} #{{ index }}</v-app-bar-title>
            </v-app-bar>
            <v-divider></v-divider>
            <v-card-subtitle>{{ $t('httpClient.basicData') }}</v-card-subtitle>
            <v-card-text>
              <div class="fields">
                <span class="fields-item-name">{{ $t('httpClient.requestedUrl') }}</span>
                <div class="width-10px"></div>
                <span class="fields-item-value">{{ item.url }}</span>
              </div>
              <div class="fields">
                <span class="fields-item-name">{{ $t('httpClient.requestMethod') }}</span>
                <div class="width-10px"></div>
                <span class="fields-item-value">{{ item.method }}</span>
              </div>
              <div class="fields">
                <span class="fields-item-name">{{ $t('httpClient.status') }}</span>
                <div class="width-10px"></div>
                <span class="fields-item-value">{{ item.status }}</span>
              </div>
            </v-card-text>
            <v-card-subtitle>{{ $t('httpClient.requestHeader') }}</v-card-subtitle>
            <v-card-text>
              <div class="fields" v-for="(header, index1) in item.requestHeaders" :key="index1">
                <span class="fields-item-name">{{ header.name }}</span>
                <div class="width-10px"></div>
                <span class="fields-item-value">{{ header.value }}</span>
              </div>
            </v-card-text>
            <v-card-subtitle>{{ $t('httpClient.responseHeader') }}</v-card-subtitle>
            <v-card-text>
              <div class="fields" v-for="(header, index1) in item.responseHeaders" :key="index1">
                <span class="fields-item-name">{{ header.name }}</span>
                <div class="width-10px"></div>
                <span class="fields-item-value">{{ header.value }}</span>
              </div>
            </v-card-text>
            <v-card-subtitle>{{ $t('httpClient.responseData') }}</v-card-subtitle>
            <v-card-text>
              <pre>{{ item.data }}</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar top v-model="message.showing" :color="message.color">{{ message.title }}</v-snackbar>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue'
import { Storage } from '@/utils/util'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'

type Header = Array<{name: string, value: string}>

interface NekoRequest {
  method?: Method
  url?: string
  data?: string
  status: number
  requestHeaders: Header
  responseHeaders: Header
  postData: string
}

const requestHistory: Array<NekoRequest> = []
const method: Method = 'GET'

export default Vue.extend({
  data () {
    return {
      isFavorite: false,
      isPinned: false,
      url: '',
      method,
      methodList: ['GET', 'POST'],
      postData: '',
      customHeaders: [{
        name: '',
        value: ''
      }],
      sendingRequest: false,
      message: {
        showing: false,
        color: 'error',
        title: ''
      },
      requestHistory
    }
  },
  mounted () {
    document.title = `${this.$t('basic.title')} - ${this.$t('httpClient.title')}`
  },
  methods: {
    setFavorite () {
      this.isFavorite = !this.isFavorite
      Storage.setItem('/http-client:isFavorite', String(this.isFavorite))
    },
    setPinned () {
      this.isPinned = !this.isPinned
      Storage.setItem('/http-client:isPinned', String(this.isPinned))
    },
    addEmptyHeader () {
      this.customHeaders.push({ name: '', value: '' })
    },
    removeHeader (index: number) {
      this.customHeaders.splice(index, 1)
    },
    sendRequest: function () {
      if (!this.postSendingRequest()) {
        return
      }
      this.sendingRequest = true
      const headers: any = {}
      this.customHeaders.forEach((it) => {
        if (it.name !== '' && it.value !== '') {
          headers[it.name] = it.value
        }
      })
      const config: AxiosRequestConfig = {
        method: this.method,
        url: this.url,
        headers
      }
      if (this.method.endsWith('POST')) {
        config.data = this.postData
      }
      axios.request(config).then((res: AxiosResponse) => {
        const requestHeaders: Header = []
        const responseHeaders: Header = []
        Object.keys(res.config.headers).forEach(name => {
          requestHeaders.push({ name: name, value: res.config.headers[name] })
        })
        Object.keys(res.headers).forEach(name => {
          responseHeaders.push({ name: name, value: res.headers[name] })
        })

        this.requestHistory.push({
          status: res.status,
          method: res.config.method,
          url: res.config.url,
          data: res.data,
          requestHeaders: requestHeaders,
          responseHeaders: responseHeaders,
          postData: this.postData
        })
      }).catch((e: AxiosError) => {
        this.requestHistory.push({
          status: e.response?.status || -1,
          method: e.config.method,
          url: e.config.url,
          data: undefined,
          requestHeaders: e.config.headers,
          responseHeaders: e.response?.headers,
          postData: this.postData
        })
      }).finally(() => {
        this.sendingRequest = false
      })
    },
    postSendingRequest (): boolean {
      if (this.url === '') {
        this.showMessage(this.$t('httpClient.urlMustNotEmpty').toString(), 'error')
        return false
      }
      return true
    },
    showMessage (msg: string, color: 'warn' | 'error') {
      this.message.showing = true
      this.message.color = color
      this.message.title = msg
    }
  }
})
</script>
<style lang="less">
.request {
  .v-card__subtitle {
    padding-top: 0!important;
  }
  .button-height-equals-text-field {
    height: 56px!important;
  }
}

.request-container {
  padding-bottom: 0!important;
}

.fields {
  display: flex;
  &-item-name {
    flex: 1;
  }
  &-item-value {
    flex: 2;
    text-align: left;
  }
}
</style>
