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


export default new class Api {
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
    const result = (await fetch(url, params)).json()
    clearTimeout(timerId)
    return result
  }

  stagesInfo(chainId:number|string) {
    return this.call(`sale/${chainId}/info`)
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

  getUserProfile():Promise<ProfileProps>{
    return this.call('/profile/')
  }

  async getUserRefcode():Promise<string> {
    const res = await this.call('/profile/refcode')
    return res.refcode
  }

  getUserBalances(chainId:number|string, wallet:string):Promise<any>{
    return this.call(`/profile/balance/${chainId}/${wallet}`)
  }
  
  getDepositTx(chainId:number|string, token:string, amount:number|string){
    return this.call(`/sale/${chainId}/depositTxData?token=${token}&amount=${amount}`)
  }

  getBuyTx(chainId:number|string, token:string, amount:number|string){
    return this.call(`/sale/${chainId}/buyTxData?token=${token}&amount=${amount}`)
  }

  saveTx(params:SaveTransactionParams):Promise<{success:Boolean}>{
    return this.call('/profile/saveTx', params)
  }
}()