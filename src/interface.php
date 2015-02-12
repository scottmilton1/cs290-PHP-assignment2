<!DOCTYPE html>
  <head>
    <!--
      CS290 PHP MySQL Assignment
      Author: Scott Milton
      Date: 2/15/15
      Description:  This project is a simple interface to work with a database that tracks a store's inventory of videos.
    -->
    <meta charset="UTF-8">

    <title>
      CS 290 PHP Assignment 2
    </title>

    <link href="style.css" rel="stylesheet">
    <script src="code.js"></script>

  </head>
  <body>
    <section>
      <h1>
        Video Store Inventory System
      </h1>

      <form action="#" method="post">
        <fieldset>
          <p>
            <label>
              Name:
              <input name="name" placeholder="enter video title">
            </label>
            <label>
              Category:
              <input name="category" placeholder="enter category">
            </label>
            <label>
              Length:
              <input name="length" placeholder="enter length">
            </label>
            <br>
            <button id="submit-button" type="button">
              Add New Video
            </button>
            <button id="delete-all" type="button">
              Delete All Videos
            </button>
          </p>
        </fieldset>
      </form>

      <table id="video-list">
        <caption>
          Current Inventory
        </caption>
        <thead>
          <tr>
            <th class="statusCol">status
            <th class="manageCol">manage
            <th class="nameCol">name
            <th class="categoryCol">category
            <th class="lengthCol">length
          </tr>
        </thead>
        <tr>
          <td class="statusCol">
          <td class="manageCol">
            <span>Check in</span>
            <span>Delete</span>
          <td class="nameCol">
          <td class="categoryCol">
          <td class="lengthCol">
      </table>

    </section>
  </body>
</html>