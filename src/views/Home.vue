<template>
  <div class="container mt-4 mb-4 home">
    <h1 style="text-align: center;">Приветствуем на нашей платформе, путник!</h1>
    <h4>Дуэт разработчиков представит тебе проект Портфолио, а также расскажет о том, для чего эта платформа была создана</h4>
    <p>Обучаясь в университете, мы заметили, что преподавателям недостает такой учетки, где были бы вписаны все активные и желающие участвовать в разных мероприятиях студенты.</p>
    <p>Например, Иванов Иван желает поучаствовать в хакатоне цифровой трансформации, а Мария Ивановна ищет кого бы отправить на такое мероприятие, но друг о друге эти вымышленные персонажи не знают.</p>
    <p>И пока желание первого не угасло и преподаватель не нашел случайную жертву, оба этих персонажа могут посетить нашу платформу и язъвить в ней свое желание.</p>
    <p>Как это происходит?</p>
    <h4>Например, студент или ученик школы:</h4>
    <ul>
      <li>Регистрируется на платформе</li>
      <li>Заполняет свой профиль в личном кабинете</li>
      <li>Ждет своего часа, ежедневно проверяя почту</li>
    </ul>
    <h4>А теперь преподаватель или учитель:</h4>
    <ul>
      <li>Получает данные для входа от сисадмина своей организации</li>
      <li>Заходит на платформу Портфолио</li>
      <li>Заполняет свой профиль</li>
      <li>Переходит на страницу поиска</li>
      <li>Вбивает необъходимые параметры поиска</li>
      <li>Выбирает учащихся из списка для участия</li>
      <li>Связывается с ними любым удобным способом</li>
    </ul>
    <h3 style="text-align: center;">Наша команда</h3>
    <div class="developers">
      <div class="developer">
        <header>
          <h3><i>Шукуров Фотех Фуркатович</i></h3>
        </header>
        <main>
          <p><strong><u>Бэкэнд разработчик</u></strong></p>
          <p>Основной инструмент разработки: язык Python</p>
          <p>Гордится своим вкладом в эту платформу</p>
        </main>
        <footer>
          <q>В процессе создания этой платформы я ощутил много разных чувств, но в итоге все свелось к гордости за свое детище.</q>
        </footer>
      </div>
      <div class="developer">
        <header>
          <h3><i>Расулов Гасанбег Магомедович</i></h3>
        </header>
        <main>
          <p><strong><u>Фронтенд разработчик</u></strong></p>
          <p>Основной инструмент разработки: язык JavaScript</p>
          <p>Почти доволен своим дизайном</p>
        </main>
        <footer>
          <q>Я бы хотел привнести еще больше актуальных концепций дизайна в эту платформу, однако мои вспышки желания сделать это останавливает вопрос: а действительно ли это будет хорошим решением?</q>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  border-radius: 12px;
  border: 3px solid blueviolet;
  background: #fff;
  padding: 12px;
  color: blueviolet;
}
.developers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 36px;
}
.developer {
  border: 2px solid blueviolet;
  border-radius: 8px;
  padding: 12px;
  width: 400px;
}
.developer main {
  margin: 15px 0;
  padding: 15px 0;
  border-top: 1px solid blueviolet;
  border-bottom: 1px solid blueviolet;
}
</style>