## Veterinary Hospital Registration System (動物醫院掛號系統)
- Developing Web Pages with ***Vue3, Vuetify3***
- [BackEnd Click Here ~ (後端點這)](https://github.com/sleepyhazzzel/vet-back)

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
  account: 'yangching.emily@gmail.com',
  password: 'w6e7r8'
}
```
- Admin -----> [Link](https://sleepyhazzzel.github.io/vet-front/#/admin)
```javascript
const admin = {
  account: 'Name',
  password: admin.account.toLowerCase() // 'name'
}
```

<br>

### 📂 Packages (套件)
- Validate data correctness with [vee-validate](https://github.com/logaretm/vee-validate), [validator](https://github.com/validatorjs/validator.js), [taiwan-id-validate](https://github.com/enylin/taiwan-id-validator)
- Make an appointment in admin page with [fullcalendar](https://github.com/fullcalendar/fullcalendar)
- Use [vue-the-mask](https://github.com/vuejs-tips/vue-the-mask) [(Demo)](https://vuejs-tips.github.io/vue-the-mask/) to let long numbers more clearify

<br>

### 🗺️ Site Map (網站地圖)
![](https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/Sitemap.png)

<br>

### 🖥️ UI Design (使用介面設計)
<table>
  <tr>
    <td width="200px">Registration System - Client <br>(掛號系統 - 用戶端)</td>
    <td><img src="https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/registration-client.png"></td>
  </tr>
  <tr>
    <td>Current appointment number <br>(目前看診進度)</td>
    <td><img src="https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/current-status.png"></td>
  </tr>
  <tr>
    <td>Account <br>(個人帳號)</td>
    <td><img src="https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/Account.png"></td>
  </tr>
  <tr>
    <td>Pet's medical <br>(寵物病例)</td>
    <td><img src="https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/admin_medical.jpg"></td>
  </tr>
  <tr>
    <td>Registration System - Admin <br>(掛號系統 - 管理端)</td>
    <td><img src="https://github.com/sleepyhazzzel/vet-front/blob/main/src/assets/admin_reserve.jpg"></td>
  </tr>
</table>
