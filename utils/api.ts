type LoginProps = {
  wallet : string,
  msg    : string,
  sign   : string,
  refcode: string
}
type statusParams = "PENDING" | "SUCCESS" | "ERROR";
type typeParams   = "DEPOSIT" | "CANCEL" | "BUY" | "CLAIM";
type SaveTransactionParams = {
  hash    : string
  stage?  : string
  chainId?: number
  status  : statusParams
  type?   : typeParams
  token?  : string
  amount? : string
  details?: Record<string, any>
}

type TxProps = {
  hash     : string
  profileId: string
  status   : statusParams
  type     : typeParams
  details  : any
  token    : string
  amount   : string
}

type ProfileProps = {
  id      : string
  wallet  : string
  refcode : string
  referrer: string
}


class Api {
  public apiDomain = process.env.API_URL

  private authToken = null
  constructor(){
    if (typeof localStorage !== 'undefined') {
      this.authToken = localStorage.authToken || null
    }
  }

  /**
   * Call API method
   * @param  {string} route - uri path
   * @param  {object} body - post body converted to json
   */
  async call (route:string, body:any = null, timeout = 10000) {
    if (typeof window === 'undefined') return

    const url = [this.apiDomain, route].join('/').replace('://','____').split('//').join('/').replace('____', '://')
    const params:any = (body)
      ? {
          method: 'POST',
          body: JSON.stringify(body)
        }
      : {}

    params.headers = { Accept : 'application/json' }
    params.headers['Content-Type'] = 'application/json'

    if (this.authToken) {
      params.headers.Authorization = 'Bearer ' + this.authToken
    }

    const controller = new AbortController()
    const timerId = setTimeout(() => controller.abort(), timeout)
    params.signal =  controller.signal

    let result
    try {
      result = (await fetch(url, params)).json()
    } catch (err) {
      console.error(err)
      throw err
    }
    clearTimeout(timerId)
    return result
  }

  authCall(...args:any[]){
    if (!this.hasAuthToken()) return new Promise(()=>{})
    // @ts-ignore
    return this.call(...args)
  }

  stagesInfo(chainId:number|string) {
    return this.call(`sale/${chainId}/info`)
  }
  async receiveTokens() {
    try {
        const [ethRes, bscRes] = await Promise.all([this.stagesInfo(1), this.stagesInfo(56)])
        return {
            current : Math.ceil(ethRes.sold * 0.03 + bscRes.sold * 0.04),
            target  : 1230000
            // todo: update backend data
            //   ethRes.stages.reduce((a: any, i: any) => {
            //     return a + i.cap;
            // }, 0)
        };
    } catch (e) { console.log(e) }
  }

  stageSoldSum(stageId:number|string){
    return this.call(`sale/sold/${stageId}/`)
  }

  async login(opts:LoginProps):Promise<ProfileProps> {
    function isMobile () {
			const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			return regex.test(navigator.userAgent)
		}

    const params = {
      ...opts,
      device: isMobile() ? 'mobile' : 'desktop'
    }

    const resp = await this.call('/profile/auth/', params)
    if (!resp.accessToken) {
      throw new Error('Invalid login')
    }
    this.authToken = resp.accessToken
    localStorage.authToken = this.authToken 
    return resp.profile
  }

  hasAuthToken(){
    return !!this.authToken
  }

  getUserProfile():Promise<ProfileProps>{
    return this.authCall('/profile/')
  }

  sendUserEmail(email:string){
    return this.authCall('/profile/email', {email})
  }

  async getUserRefcode():Promise<string> {
    const res = await this.authCall('/profile/refcode')
    return res.refcode
  }

  getUserReferrals():Promise<any>{
    return this.authCall('/profile/referrals')
  }

  getUserBalances(chainId:number|string):Promise<any>{
    return this.authCall(`/profile/balance/${chainId}/`)
  }

  getTokensRate(){
    return this.call('/sale/rate')
  }
  
  getDepositTx(chainId:number|string, token:string, amount:number|string){
    return this.call(`/sale/${chainId}/depositTxData?token=${token}&amount=${amount}`)
  }

  getBuyTx(chainId:number|string, token:string, amount:number|string){
    return this.authCall(`/sale/${chainId}/buyTxData?token=${token}&amount=${amount}`)
  }

  saveTx(params:SaveTransactionParams):Promise<{success:Boolean}>{
    return this.authCall('/profile/saveTx', params)
  }

  getTransactions():Promise<any>{
    return this.authCall('/profile/txs/')
  }
}

export default new Api()