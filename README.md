## Veterinary Hospital Registration System (動物醫院掛號系統)
<br>

> [!IMPORTANT]
> ***Render Free Web Service:*** <br>
> It takes a few minutes to call the back-end data when you first enter the web page.<br>
> ( 網頁資料在第一次進入網頁時需要花幾分鐘從 Render 呼叫後端 )

<br>

### 🤔 How to Login
- Client -----> [Link](https://sleepyhazzzel.github.io/vet-front/#/setup)
``` javascript
const client = {
  Account: 'yangching.emily@gmail.com',
  Password: 'w6e7r8'
}
```
- Admin -----> [Link](https://sleepyhazzzel.github.io/vet-front/#/admin)
```javascript
const adminAccount = 'Name'
const adminPassword = adminAccount.toLowerCase() // adminPassword = name
```

<br>

### Packages (套件)
- Validate data correctness with [vee-validate](https://github.com/logaretm/vee-validate), [validator](https://github.com/validatorjs/validator.js), [taiwan-id-validate](https://github.com/enylin/taiwan-id-validator)
- Make an appointment in admin page with [fullcalendar](https://github.com/fullcalendar/fullcalendar)
- Use [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask) [(Demo)](https://vuejs-tips.github.io/vue-the-mask/) to let long numbers more clearify

<br>

### Site Map (網站地圖)
![](https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/Sitemap.png)

<br>

### Registration System - Client (掛號系統 - 用戶端)
![](https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/registration-client.png)
### Current appointment number (目前看診進度)
![](https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/current-status.png)
### Account Setting (帳號設定)
![](https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/Account.png)
