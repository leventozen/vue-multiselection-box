<template>
  <section class="vue-multiselectbox">
    <div class="multiselect-header">
      <div class="multiselect-title" :style="leftSection.styles">
        {{ leftSection.text }}
      </div>
      <div class="multiselect-title" :style="rightSection.styles">
        {{ rightSection.text }}
      </div>
    </div>

    <div class="multiselect-container">
      <div class="multiselect-box">
        <div class="multiselect-box-border multiselect-box-border-first">
          <div class="multiselect-box-search">
            <input
              type="text"
              class="form-control"
              :placeholder="
                `${
                  baseList.length > 1
                    ? 'Search in ' + baseList.length + ' entries'
                    : 'Search in ' + baseList.length + ' entry'
                }`
              "
              v-model="baseSearchValue"
            />
            <select
              v-if="isSortable"
              class="form-control"
              v-model="leftSection.sortOption"
            >
              <option :value="null" disabled>Sort Options</option>
              <option value="asc">Ascended</option>
              <option value="desc">Descended</option>
            </select>
          </div>
          <transition-group v-if="filteredBase.length" class="list-group">
            <li
              v-for="b in filteredBase"
              :key="b[mappingOptions.key]"
              class="list-group-item"
              @click="transferToRight(b)"
            >
              {{ b[mappingOptions.value] }}
            </li>
          </transition-group>
        </div>
        <transition name="fade">
          <div v-if="filteredBase.length" class="btn-wrapper">
            <a class="btn-move" @click="addAll" />
          </div>
        </transition>
      </div>
      <div class="multiselect-box">
        <div class="multiselect-box-border multiselect-box-border-first">
          <div class="multiselect-box-search">
            <input
              type="text"
              class="form-control"
              :placeholder="
                `${
                  selectedList.length > 1
                    ? 'Search in ' + selectedList.length + ' entries'
                    : 'Search in ' + selectedList.length + ' entry'
                }`
              "
              v-model="selectedSearchValue"
            />
            <select
              v-if="isSortable"
              class="form-control"
              v-model="rightSection.sortOption"
            >
              <option :value="null" disabled>Sort Options</option>
              <option value="asc">Ascended</option>
              <option value="desc">Descended</option>
            </select>
          </div>

          <transition-group v-if="filteredSelected.length" class="list-group">
            <li
              v-for="b in filteredSelected"
              :key="b[mappingOptions.key]"
              class="list-group-item selected"
              @click="transferToLeft(b)"
            >
              {{ b[mappingOptions.value] }}
            </li>
          </transition-group>
        </div>
        <transition name="fade">
          <div v-if="filteredSelected.length" class="btn-wrapper">
            <a class="btn-empty" @click="removeAll" />
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
export default {

  props: {
    leftSection: {
      type: Object,
      default: () => ({
        text: "Available",
        styles: {
          backgroundColor: "#0acf97"
        },
        sortOption: null
      })
    },

    rightSection: {
      type: Object,
      default: () => ({
        text: "Assigned",
        styles: {
          backgroundColor: "#727df5"
        },
        sortOption: null
      })
    },
    mappingOptions: {
      type: Object,
      default: () => ({
        value: "name",
        key: "id"
      })
    },

    baseList: {
      type: Array,
      default: () => [
        { id: 1, name: "Person 1" },
        { id: 3, name: "Person 3" },
        { id: 4, name: "Person 4" },
        { id: 5, name: "Person 5" }
      ]
    },

    selectedList: {
      type: Array,
      default: () => [
        { id: 2, name: "Person 2" },
        { id: 6, name: "Person 6" },
        { id: 7, name: "Person 7" }
      ]
    },

    isSortable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    baseSearchValue: "",
    selectedSearchValue: ""
  }),
  computed: {
    baseListLocal: {
      get: function() {
        return this.baseList;
      },
      set: function(item) {
        this.$emit("updateBase", item);
      }
    },
    selectedListLocal: {
      get: function() {
        return this.selectedList;
      },
      set: function(item) {
        this.$emit("updateSelected", item);
      }
    },
    filteredBase() {
      return this.baseListLocal
        .filter(item => {
          return item[this.mappingOptions.value]
            .toLowerCase()
            .includes(this.baseSearchValue.toLowerCase());
        })
        .sort(this[this.leftSection.sortOption]);
    },
    filteredSelected() {
      return this.selectedListLocal
        .filter(item => {
          return item[this.mappingOptions.value]
            .toLowerCase()
            .includes(this.selectedSearchValue.toLowerCase());
        })
        .sort(this[this.rightSection.sortOption]);
    }
  },

  methods: {
    addAll() {
      this.selectedListLocal = [
        ...this.selectedListLocal,
        ...this.baseListLocal
      ];
      this.baseListLocal = [];
    },

    removeAll() {
      this.baseListLocal = [...this.baseListLocal, ...this.selectedListLocal];
      this.selectedListLocal = [];
    },

    transferToRight(item) {
      this.baseListLocal = this.baseListLocal.filter(
        listItem =>
          listItem[this.mappingOptions.key] !== item[this.mappingOptions.key]
      );
      this.selectedListLocal = [...this.selectedListLocal, item];
    },

    transferToLeft(item) {
      this.selectedListLocal = this.selectedListLocal.filter(
        listItem =>
          listItem[this.mappingOptions.key] !== item[this.mappingOptions.key]
      );

      this.baseListLocal = [...this.baseListLocal, item];
    },

    asc(a, b) {
      return a[this.mappingOptions.value].localeCompare(
        b[this.mappingOptions.value]
      );
    },

    desc(a, b) {
      return b[this.mappingOptions.value].localeCompare(
        a[this.mappingOptions.value]
      );
    }
  }
};
</script>

<style>
  .vue-multiselectbox {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .multiselect-container {
    display: flex;
    flex-flow: row wrap;
  }

  .multiselect-header {
    display: flex;
    flex-direction: row;
    margin: 0px !important;
    padding-bottom: 0px;
    color: white;
    font-size: medium;
  }

  .multiselect-title {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    height: 31px;
    line-height: 31px;
    background-color: #727df5;
    padding-left: 16px;
    font-weight: bold;
    flex: 1 100%;
  }

  .multiselect-box {
    flex: 1;
  }

  .multiselect-box-border {
    border: solid 1px #707070;
    height: 245px;
    overflow: auto;
  }

  .multiselect-box-border-first {
    background-color: #f7f7f7;
    border-right: transparent;
  }

  .multiselect-box .form-control {
    margin: 7px 15px;
    height: 32px;
    width: 100%;
    background-color: white;
    padding-left: 10px;
  }

  .multiselect-box-search {
    display: flex;
    align-items: center;
    border-bottom: solid 1px #707070;
  }

  .multiselect-box-filtering {
    display: flex;
    border-bottom: solid 1px #707070;
  }

  .multiselect-box .list-group-item {
    cursor: pointer;
    background-color: #e8e7e7;
    padding: 0 12px;
    height: 39px;
    line-height: 39px;
    border-radius: 0;
  }

  .multiselect-box .list-group-item.selected {
    background-color: #4a8ef1;
    color: #fff;
  }

  .multiselect-box .list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
  }

  .multiselect-box .list-group-item.selected:nth-child(even),
  .multiselect-box .list-group-item.selected:hover {
    background-color: #3975f1;
  }

  .multiselect-container .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .multiselect-container .btn-move,
  .multiselect-container .btn-empty {
    cursor: pointer;
    font-weight: bold;
    padding: 15px 18px;
    width: 115px;
    height: 35px;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #707070;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .multiselect-container .btn-move {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NC4zNjUiIGhlaWdodD0iMTQuNTk1IiB2aWV3Qm94PSIwIDAgODQuMzY1IDE0LjU5NSI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIC5jbHMtMXtmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJtb3ZlLWFsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3OS45OTYgLTUyMi40MDUpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0iYXJyb3ciIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zMyIgZD0iTTAgNy4zTDguOTE5IDB2NC4wNTRoOS40NjR2Ni40ODZIOC45MTl2NC4wNTR6IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzMyIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzUxIiBkPSJNOS4zMjgtNi40NjNxLS41MjEgMS4yODktLjkzMiAyLjMtLjE3Ni40MzQtLjM0Ljg0NHQtLjMuNzMybC0uMjE0LjUyMS0uMDc2LjE5M3EtLjEyMy4zLS4yNjEuNTY4YTIuMzMgMi4zMyAwIDAgMS0uMzA1LjQ3IDEuNDM2IDEuNDM2IDAgMCAxLS40LjMyMiAxLjA0IDEuMDQgMCAwIDEtLjUwNy4xMiAxLjEwNiAxLjEwNiAwIDAgMS0uNDYzLS4wOTEgMS4xMjQgMS4xMjQgMCAwIDEtLjM2Ni0uMjc1IDIuMjQ4IDIuMjQ4IDAgMCAxLS4zMTMtLjQ2MyA2LjcyNiA2LjcyNiAwIDAgMS0uMjkzLS42NDdsLTEuODQ1LTQuNTdWLS44NWEuODQzLjg0MyAwIDAgMS0uMDY3LjMzNC44My44MyAwIDAgMS0uMTg1LjI3Mi44ODkuODg5IDAgMCAxLS4yNzUuMTgyLjg0My44NDMgMCAwIDEtLjMzNC4wNjcuODQzLjg0MyAwIDAgMS0uMzM0LS4wNjcuODU0Ljg1NCAwIDAgMS0uMjcyLS4xODIuODU0Ljg1NCAwIDAgMS0uMTgyLS4yNzJBLjg0My44NDMgMCAwIDEgMS0uODV2LTUuNDA4YTcuNDc2IDcuNDc2IDAgMCAxIC4wNTMtLjkyOSAxLjk4MyAxLjk4MyAwIDAgMSAuMjEtLjcxMyAxLjEzNCAxLjEzNCAwIDAgMSAuNDUxLS40NTQgMS41NzEgMS41NzEgMCAwIDEgLjc2NS0uMTYxIDEuNDExIDEuNDExIDAgMCAxIC41OTUuMTE3IDEuMzg1IDEuMzg1IDAgMCAxIC40NzUuMzc4IDMuNDQyIDMuNDQyIDAgMCAxIC40MjguNjc3cS4yMDguNDE2LjQ1NCAxLjAwOGwxLjU2MyAzLjc4aC4wNDdsMS41ODItMy43NzlxLjIxMS0uNS40MTMtLjkwOGEzLjczMyAzLjczMyAwIDAgMSAuNDMxLS42ODYgMS43NjkgMS43NjkgMCAwIDEgLjUtLjQzNCAxLjIyOCAxLjIyOCAwIDAgMSAuNjE1LS4xNTIgMS43NTMgMS43NTMgMCAwIDEgLjY1My4xMTEgMS4wMjYgMS4wMjYgMCAwIDEgLjQ1Ny4zNTcgMS43MTUgMS43MTUgMCAwIDEgLjI2Ny42MzYgNC4zMzYgNC4zMzYgMCAwIDEgLjA4OC45NHY1LjYyYS44NDMuODQzIDAgMCAxLS4wNjcuMzM0LjgzLjgzIDAgMCAxLS4xODUuMjcyLjg4OS44ODkgMCAwIDEtLjI3NS4xODIuODQzLjg0MyAwIDAgMS0uMzM0LjA2Ny44NDMuODQzIDAgMCAxLS4zMzYtLjA2Ny44NTQuODU0IDAgMCAxLS4yNzItLjE4Mi44NTQuODU0IDAgMCAxLS4xNzgtLjI3Mi44NDMuODQzIDAgMCAxLS4wNzItLjMzNHptMy4xMjMgMy41MWEzLjQgMy40IDAgMCAxIC4yLTEuMTc1IDIuNjg3IDIuNjg3IDAgMCAxIC42MDktLjk3IDIuOTM2IDIuOTM2IDAgMCAxIDEuMDItLjY2MiAzLjg0NCAzLjg0NCAwIDAgMSAxLjQzOC0uMjQ2IDMuOTczIDMuOTczIDAgMCAxIDEuNC4yMjkgMi45IDIuOSAwIDAgMSAxLjAyNS42MzYgMi43IDIuNyAwIDAgMSAuNjMzLjk2N0EzLjM1NCAzLjM1NCAwIDAgMSAxOS0yLjk1M2EzLjI5IDMuMjkgMCAwIDEtLjIwNSAxLjE2MyAyLjY4NCAyLjY4NCAwIDAgMS0uNjE1Ljk2MSAyLjk1IDIuOTUgMCAwIDEtMS4wMjUuNjU2IDMuODczIDMuODczIDAgMCAxLTEuNDMuMjQzIDMuOTg4IDMuOTg4IDAgMCAxLTEuNDE1LS4yMzFBMi45IDIuOSAwIDAgMSAxMy4yOC0uOGEyLjYzMiAyLjYzMiAwIDAgMS0uNjIxLS45NjEgMy4zNjMgMy4zNjMgMCAwIDEtLjIwOC0xLjE5MnptMS45NTEgMGEzLjcxNCAzLjcxNCAwIDAgMCAuMDcuNzM1IDEuOTYyIDEuOTYyIDAgMCAwIC4yMjYuNjEyIDEuMiAxLjIgMCAwIDAgLjQwNy40MTkgMS4xNTEgMS4xNTEgMCAwIDAgLjYxNS4xNTUgMS4xNjYgMS4xNjYgMCAwIDAgLjU4My0uMTQxIDEuMTU5IDEuMTU5IDAgMCAwIC40MS0uMzkzIDEuOTIyIDEuOTIyIDAgMCAwIC4yNDMtLjYwNiAzLjQ3MiAzLjQ3MiAwIDAgMCAuMDgyLS43ODIgMy41NyAzLjU3IDAgMCAwLS4wNzMtLjczNSAyIDIgMCAwIDAtLjIzMS0uNjE1IDEuMjIzIDEuMjIzIDAgMCAwLS40MDctLjQyMiAxLjEyNCAxLjEyNCAwIDAgMC0uNjA2LS4xNTUgMS4xNTcgMS4xNTcgMCAwIDAtLjYwOS4xNTIgMS4yIDEuMiAwIDAgMC0uNDEuNDE2IDEuOTE3IDEuOTE3IDAgMCAwLS4yMjkuNjE1IDMuNzg5IDMuNzg5IDAgMCAwLS4wNzMuNzQ1em05LjY4IDEuNjUzYTMuMTQzIDMuMTQzIDAgMCAxLS4yNzUuNiAxLjYwNiAxLjYwNiAwIDAgMS0uMzQuNCAxLjE5MiAxLjE5MiAwIDAgMS0uNDIyLjIyNiAxLjgzMyAxLjgzMyAwIDAgMS0uNTI3LjA3IDEuNDg3IDEuNDg3IDAgMCAxLS42LS4xMTEgMS4zMTUgMS4zMTUgMCAwIDEtLjQ1NC0uMzQgMi41NiAyLjU2IDAgMCAxLS4zNzItLjU3N3EtLjE3LS4zNDktLjM0Ni0uODIzTDE5LjgtNC4zODNxLS4wNjQtLjE2NC0uMTQxLS4zNTRhLjk0Ny45NDcgMCAwIDEtLjA3Ni0uMzQ5LjgyNy44MjcgMCAwIDEgLjA2NC0uMzMxLjc0Mi43NDIgMCAwIDEgLjE3OS0uMjU1LjgyNi44MjYgMCAwIDEgLjI2Ny0uMTY0LjkwNi45MDYgMCAwIDEgLjMyOC0uMDU5LjY4LjY4IDAgMCAxIC4zOS4xMjYgMS40MiAxLjQyIDAgMCAxIC4zMzEuMzE5IDIuNCAyLjQgMCAwIDEgLjI1NS40MjIgMi41IDIuNSAwIDAgMSAuMTYxLjQyOGwuOTYxIDIuOTgyIDEuMDI1LTMuMmEyLjk0OSAyLjk0OSAwIDAgMSAuMTU1LS40MTkgMS41MjUgMS41MjUgMCAwIDEgLjIxNC0uMzQzLjk3My45NzMgMCAwIDEgLjI3OC0uMjMxLjcyNi43MjYgMCAwIDEgLjM1NC0uMDg1IDEuMDMxIDEuMDMxIDAgMCAxIC4zMjguMDUzLjgyNi44MjYgMCAwIDEgLjI3OC4xNTUuNzc1Ljc3NSAwIDAgMSAuMTkzLjI1Mi43ODMuNzgzIDAgMCAxIC4wNzMuMzQ5IDEuMDI2IDEuMDI2IDAgMCAxLS4wNy4zNDZsLS4xMjkuMzU3cS0uMjgxLjc3OS0uNTY1IDEuNTQ0em04LjAzMy0xLjg0YS40MTYuNDE2IDAgMCAxLS4xNTguMzU3LjcyNS43MjUgMCAwIDEtLjQzOS4xMTdoLTMuNjI3YTEuNjE0IDEuNjE0IDAgMCAwIC40MDcgMS4xIDEuNTM3IDEuNTM3IDAgMCAwIDEuMTUxLjM5IDMuMjU1IDMuMjU1IDAgMCAwIC40NzItLjAzMiAzLjkxIDMuOTEgMCAwIDAgLjQzMS0uMDg4cS4yMTEtLjA1Ni40MjItLjEyNmwuNDM5LS4xNDZhLjM4Mi4zODIgMCAwIDEgLjEzNS0uMDI5LjM3NS4zNzUgMCAwIDEgLjMxMS4xNDkuNTQ5LjU0OSAwIDAgMSAuMTE3LjM0OS42MDkuNjA5IDAgMCAxLS4wNDEuMjIzIDEuMDQ2IDEuMDQ2IDAgMCAxLS4zODcuNDY2IDIuMjgxIDIuMjgxIDAgMCAxLS42MjEuMjkzIDMuODkzIDMuODkzIDAgMCAxLS43NDQuMTQ5IDcuMjI3IDcuMjI3IDAgMCAxLS43NS4wNDEgMy45NjkgMy45NjkgMCAwIDEtMS4yNTctLjE5MyAyLjg0OCAyLjg0OCAwIDAgMS0xLjAxMS0uNTggMi42MyAyLjYzIDAgMCAxLS42NzEtLjk1NSAzLjM4OCAzLjM4OCAwIDAgMS0uMjQzLTEuMzMgMi45OTEgMi45OTEgMCAwIDEgLjIzNC0xLjE4NCAyLjg3OCAyLjg3OCAwIDAgMSAuNjUzLS45NTUgMy4wOTIgMy4wOTIgMCAwIDEgMS0uNjM5IDMuMzQxIDMuMzQxIDAgMCAxIDEuMjYyLS4yMzEgMy4zIDMuMyAwIDAgMSAxLjI5NS4yMzEgMi41NjMgMi41NjMgMCAwIDEgLjkuNjIxIDIuNTI3IDIuNTI3IDAgMCAxIC41MzMuOTA4IDMuNDkzIDMuNDkzIDAgMCAxIC4xODcgMS4wOTN6bS0xLjU2NC0uMzZhMi4xMjUgMi4xMjUgMCAwIDAtLjEwOC0uNTc0IDEuMzc2IDEuMzc2IDAgMCAwLS4yNTgtLjQ1NyAxLjE1NiAxLjE1NiAwIDAgMC0uNDEtLjMgMS4zNzggMS4zNzggMCAwIDAtLjU2NS0uMTA4IDEuMjA3IDEuMjA3IDAgMCAwLS41My4xMTQgMS4yODIgMS4yODIgMCAwIDAtLjQxLjMxMSAxLjQ0MyAxLjQ0MyAwIDAgMC0uMjcuNDU3IDEuOTI2IDEuOTI2IDAgMCAwLS4xMTQuNTZ6bTkuODE0LTMuNDFsLTEuMjg5IDMuNzY5aDIuNmwtMS4yODEtMy43Njd6bTMuODIgNS4xMzNsLjA4OC4yMnEuMDQ3LjExNS4wODguMjMxLjA0MS4xMTcuMDY3LjIyNmEuODM4LjgzOCAwIDAgMSAuMDI2LjIuODg3Ljg4NyAwIDAgMS0uMDc5LjM4NC44MjguODI4IDAgMCAxLS4yMTQuMjgxLjk2NS45NjUgMCAwIDEtLjMxMy4xNzYgMS4xNTMgMS4xNTMgMCAwIDEtLjM3Ny4wNTkgMS4wNzMgMS4wNzMgMCAwIDEtLjM5My0uMDY0Ljc4NC43ODQgMCAwIDEtLjI5My0uMjA1IDEuNSAxLjUgMCAwIDEtLjIzNy0uMzY2cS0uMTA4LS4yMjYtLjIzMS0uNTU0bC0uMjgxLS43NDRoLTMuMzE3bC0uMjQuNzQ0YTQuNDc3IDQuNDc3IDAgMCAxLS4yMTQuNTYzIDEuMzgzIDEuMzgzIDAgMCAxLS4yNC4zNjYuNzg0Ljc4NCAwIDAgMS0uMy4yIDEuMTcgMS4xNyAwIDAgMS0uNC4wNjIgMS4xNTMgMS4xNTMgMCAwIDEtLjM3OC0uMDYyLjk2NS45NjUgMCAwIDEtLjMxMy0uMTc2LjgyOC44MjggMCAwIDEtLjIxNC0uMjgxLjg4Ny44ODcgMCAwIDEtLjA4LS4zODMuODM4LjgzOCAwIDAgMSAuMDI2LS4ycS4wMjYtLjEwOC4wNjctLjIyNnQuMDg4LS4yMzFxLjA0Ny0uMTE0LjA4OC0uMjJsMS41NzYtNC4yNnEuMjIzLS42LjQyNS0xLjA1OGEzLjc0NCAzLjc0NCAwIDAgMSAuNDQ1LS43NzYgMS42NTMgMS42NTMgMCAwIDEgLjU2LS40NzggMS42NzYgMS42NzYgMCAwIDEgLjc2OC0uMTYxIDEuODUyIDEuODUyIDAgMCAxIC43MjEuMTI2IDEuNDE4IDEuNDE4IDAgMCAxIC41MzkuNDE2IDMuNDQ3IDMuNDQ3IDAgMCAxIC40NTcuNzY4cS4yMTcuNDc1LjQ4IDEuMTY2em0zLjIxMS42MjFhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNi4xOTJhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMy4yNDYgMGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di02LjE5MmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMjYuODU1eiIgY2xhc3M9ImNscy0xIiBkYXRhLW5hbWU9IlBhdGggNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODUgMTQ2Ljc0MykiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }

  .multiselect-container .btn-empty {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OS4wOTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA4OS4wOTggMjIiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojNWY1ZjVmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4fS5jbHMtMntmaWxsOiM1ZjVmNWZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJlbXB0eS1saXN0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc5IC01MTkpIj4KICAgICAgICA8ZyBpZD0ibm91bl9BcnJvd18yMzEwNTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjQgMzg3LjI1NykiPgogICAgICAgICAgICA8ZyBpZD0idHJhc2giIHRyYW5zZm9ybT0icm90YXRlKDE4MCAtNDkuODIgNzQuODcxKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0idHJhc2gtMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDQzLjY4IDkuNSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0IiBkPSJNMyA2aDE4IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCAzNCIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM1IiBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2bTMgMFY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJQYXRoIDM1Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU2IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgMTEpIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IkxpbmVfMzU3IiBkPSJNMCAwdjYiIGNsYXNzPSJjbHMtMSIgZGF0YS1uYW1lPSJMaW5lIDM1NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQgMTEpIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNTAiIGQ9Ik0xLjk1NyAwYS45NDguOTQ4IDAgMCAxLS41LS4xMjMuOTc4Ljk3OCAwIDAgMS0uMzI1LS4zMTkgMS4zNjMgMS4zNjMgMCAwIDEtLjE3Ny0uNDQzQTIuMzQzIDIuMzQzIDAgMCAxIC45LTEuMzc3di01LjU4NGE0LjMzOSA0LjMzOSAwIDAgMSAuMDQxLS42MTggMS4xNCAxLjE0IDAgMCAxIC4xODItLjQ4OS45MzEuOTMxIDAgMCAxIC40MS0uMzIyIDEuODU2IDEuODU2IDAgMCAxIC43MjctLjExN2gzLjc2M2EuODMuODMgMCAwIDEgLjMxOS4wNjIuODY5Ljg2OSAwIDAgMSAuMjYxLjE2NC43NTQuNzU0IDAgMCAxIC4xNzYuMjQzLjcwOS43MDkgMCAwIDEgLjA2NC4zLjY4OS42ODkgMCAwIDEtLjA2NC4zLjc2NC43NjQgMCAwIDEtLjE3OS4yMzguODI1LjgyNSAwIDAgMS0uMjYxLjE2MS44NjcuODY3IDAgMCAxLS4zMTkuMDU5SDMuMDA2djEuOUg1Ljc2YS44NjcuODY3IDAgMCAxIC4zMTkuMDU5LjguOCAwIDAgMSAuMjYxLjE2NC44LjggMCAwIDEgLjE3Ni4yNDMuNjg5LjY4OSAwIDAgMSAuMDY0LjMuNjg5LjY4OSAwIDAgMS0uMDY0LjMuNzY0Ljc2NCAwIDAgMS0uMTc2LjI0LjgyNS44MjUgMCAwIDEtLjI2MS4xNjEuODY3Ljg2NyAwIDAgMS0uMzE5LjA1OUgzLjAwNnYyLjA1MUg2LjE3YS43NDguNzQ4IDAgMCAxIC4zLjA1OS43NjMuNzYzIDAgMCAxIC4yNDMuMTY0Ljc2My43NjMgMCAwIDEgLjE2NC4yNDMuNzQ4Ljc0OCAwIDAgMSAuMDU5LjMuNzQ4Ljc0OCAwIDAgMS0uMDU5LjMuNzMuNzMgMCAwIDEtLjE2NC4yNC43ODguNzg4IDAgMCAxLS4yNDMuMTYxLjc0OC43NDggMCAwIDEtLjMuMDM2em02LjIwNS00Ljc0YTEuNTIyIDEuNTIyIDAgMCAxIC4yLS44NTUuNzc3Ljc3NyAwIDAgMSAuNjk0LS4zLjg3Ni44NzYgMCAwIDEgLjc0Ny4zIDEuNCAxLjQgMCAwIDEgLjIyNi44NTUgMS44NjUgMS44NjUgMCAwIDEgLjMxOS0uNTEzIDIuMDg3IDIuMDg3IDAgMCAxIC40NjMtLjQgMi4yNzggMi4yNzggMCAwIDEgLjU2NS0uMjU1IDIuMiAyLjIgMCAwIDEgLjYzMy0uMDkxIDIuMzE2IDIuMzE2IDAgMCAxIC42LjA3OSAxLjgwNSAxLjgwNSAwIDAgMSAuNTUxLjI1MiAxLjgyNiAxLjgyNiAwIDAgMSAuNDQ4LjQzNyAxLjk3OSAxLjk3OSAwIDAgMSAuMy42MzMgMi41OCAyLjU4IDAgMCAxIC40MjgtLjY2MiAyLjIgMi4yIDAgMCAxIC41MzMtLjQzNCAyLjE1NiAyLjE1NiAwIDAgMSAuNi0uMjM0IDIuODcgMi44NyAwIDAgMSAuNjMtLjA3IDEuOTQ0IDEuOTQ0IDAgMCAxIC43MTguMTM1IDEuNjc2IDEuNjc2IDAgMCAxIC42LjQwNyAxLjk4OCAxLjk4OCAwIDAgMSAuNDE2LjY4NiAyLjczMyAyLjczMyAwIDAgMSAuMTU1Ljk2NHYyLjY0OGExLjQgMS40IDAgMCAxLS4yMjYuODU1Ljg3Ni44NzYgMCAwIDEtLjc0Ny4zLjc3Ny43NzcgMCAwIDEtLjY5NC0uMyAxLjUyMiAxLjUyMiAwIDAgMS0uMi0uODU1di0yLjU2M2ExLjQ2OSAxLjQ2OSAwIDAgMC0uMDctLjQ3MiAxLjAyMiAxLjAyMiAwIDAgMC0uMi0uMzUyLjgyNC44MjQgMCAwIDAtLjMtLjIxNy45MDguOTA4IDAgMCAwLS4zNjMtLjA3MyAxLjM2OSAxLjM2OSAwIDAgMC0uNDU3LjA3NiAxLjAxMSAxLjAxMSAwIDAgMC0uMzc4LjIzNCAxLjE0MiAxLjE0MiAwIDAgMC0uMjU4LjQgMS42MTkgMS42MTkgMCAwIDAtLjEuNTkydjIuMzczYTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV2LTIuNDQ5YTEuNDM3IDEuNDM3IDAgMCAwLS4yNDktLjkxNC44MjEuODIxIDAgMCAwLS42NzctLjMxMSAxLjMxNCAxLjMxNCAwIDAgMC0uNDY5LjA4MiAxLjA0OCAxLjA0OCAwIDAgMC0uMzc1LjI0IDEuMTE3IDEuMTE3IDAgMCAwLS4yNDkuMzkzIDEuNDg1IDEuNDg1IDAgMCAwLS4wOTEuNTM5djIuNDI2YTEuNCAxLjQgMCAwIDEtLjIxMi44NTQuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTV6TTIxLjI0LTIuOTY1YTQuMTE0IDQuMTE0IDAgMCAwIC4wNjIuNzMyIDEuOCAxLjggMCAwIDAgLjIxMS41OTUgMS4xMDYgMS4xMDYgMCAwIDAgLjQuNCAxLjIgMS4yIDAgMCAwIC42MTguMTQ2IDEuMDY1IDEuMDY1IDAgMCAwIC41NzEtLjE0NCAxLjA2MSAxLjA2MSAwIDAgMCAuMzcyLS40IDEuOTQgMS45NCAwIDAgMCAuMi0uNiA0LjI4NiA0LjI4NiAwIDAgMCAuMDYyLS43NSA0Ljc4MSA0Ljc4MSAwIDAgMC0uMDQ3LS42NTkgMi4xMjggMi4xMjggMCAwIDAtLjE3Ni0uNjEyIDEuMiAxLjIgMCAwIDAtLjM1Ny0uNDUxLjk1My45NTMgMCAwIDAtLjYtLjE3NiAxLjQ4OSAxLjQ4OSAwIDAgMC0uNjI0LjExNy45NTUuOTU1IDAgMCAwLS40MS4zNTcgMS42MjUgMS42MjUgMCAwIDAtLjIyLjYgNC44MjggNC44MjggMCAwIDAtLjA2Mi44NDV6bS0uMDA2LTEuNzc1YTEuOTg5IDEuOTg5IDAgMCAxIC4zNzUtLjU0NSAyLjMwNiAyLjMwNiAwIDAgMSAuNS0uMzkzIDIuMzUxIDIuMzUxIDAgMCAxIC41NzctLjIzNyAyLjM2MSAyLjM2MSAwIDAgMSAuNi0uMDc5IDEuOTczIDEuOTczIDAgMCAxIC45NzMuMjRBMi4zMTggMi4zMTggMCAwIDEgMjUtNS4xYTMuMDQ3IDMuMDQ3IDAgMCAxIC40NzIuOTczIDQuMjQgNC4yNCAwIDAgMSAuMTY0IDEuMiA0LjAzNSA0LjAzNSAwIDAgMS0uMTczIDEuMjEzIDIuOTA4IDIuOTA4IDAgMCAxLS40ODYuOTQ2IDIuMjU4IDIuMjU4IDAgMCAxLS43NS42MTggMi4xIDIuMSAwIDAgMS0uOTcuMjIzIDIuMjYgMi4yNiAwIDAgMS0xLjE3Mi0uMyAyLjQ5IDIuNDkgMCAwIDEtLjg1NS0uODU1VjEuMDJhMS40IDEuNCAwIDAgMS0uMjI2Ljg1NS44NzYuODc2IDAgMCAxLS43NDcuMy43NzcuNzc3IDAgMCAxLS42OTQtLjMgMS41MjIgMS41MjIgMCAwIDEtLjItLjg1NXYtNS43NmExLjUyMiAxLjUyMiAwIDAgMSAuMi0uODU1Ljc3Ny43NzcgMCAwIDEgLjY5NC0uMy44NzYuODc2IDAgMCAxIC43NDcuMyAxLjQgMS40IDAgMCAxIC4yMy44NTV6bTYuMDc2LTEuMTc4bC4xMjktMS4yMTNhMi40NTUgMi40NTUgMCAwIDEgLjA2Mi0uMzUyIDEuMDM3IDEuMDM3IDAgMCAxIC4xNDEtLjMyMi43MjkuNzI5IDAgMCAxIC4yNjEtLjIzNy44OC44OCAwIDAgMSAuNDI4LS4wOTEuNjE1LjYxNSAwIDAgMSAuNTYuMjcgMS41IDEuNSAwIDAgMSAuMTczLjh2MS4xNDNoLjY1NmEuNzU3Ljc1NyAwIDAgMSAuNDg2LjE0OS41NjcuNTY3IDAgMCAxIC4xODguNDcyLjUyNS41MjUgMCAwIDEtLjIuNDQ4Ljg3OS44NzkgMCAwIDEtLjUzOS4xNDloLS41OTJ2Mi4yMTVxMCAuMzUyLjAxMi42YTEuMjExIDEuMjExIDAgMCAwIC4wNzYuNC40MjIuNDIyIDAgMCAwIC4xOTMuMjIzLjgxMy44MTMgMCAwIDAgLjM2OS4wNjdxLjE3IDAgLjMzMS4wMTVhLjgzMi44MzIgMCAwIDEgLjI4NC4wNzMuNDY3LjQ2NyAwIDAgMSAuMi4xNzMuNTc3LjU3NyAwIDAgMSAuMDczLjMxMy41NDMuNTQzIDAgMCAxLS4xMTEuMzU3LjcwNy43MDcgMCAwIDEtLjMxOS4yMDggMi4wNzYgMi4wNzYgMCAwIDEtLjUuMXEtLjI5LjAyNi0uNjQ3LjAyNmEyLjM2NiAyLjM2NiAwIDAgMS0uNzQ3LS4xMjMgMS40NDcgMS40NDcgMCAwIDEtLjU4LS4zNzIgMS43IDEuNyAwIDAgMS0uMzc1LS42NjIgMy4yNzYgMy4yNzYgMCAwIDEtLjEzMi0xVi00LjdoLS4yN2EuODkuODkgMCAwIDEtLjUyNy0uMTQ5LjU1MS41NTEgMCAwIDEtLjIxMS0uNDgzLjU2My41NjMgMCAwIDEgLjE2Ny0uNDI1LjcuNyAwIDAgMSAuNTA3LS4xNjF6TTMzLjItLjA3NmwtMS45MS00LjQ1OXEtLjA2NC0uMTQ2LS4xMi0uM2EuODc3Ljg3NyAwIDAgMS0uMDU2LS4zLjczNi43MzYgMCAwIDEgLjA2NC0uMzExLjcyMi43MjIgMCAwIDEgLjE3Ni0uMjQuODE5LjgxOSAwIDAgMSAuMjU4LS4xNTUuODgzLjg4MyAwIDAgMSAuMzE2LS4wNTYuNjQuNjQgMCAwIDEgLjMzNC4wOTEgMS4wOCAxLjA4IDAgMCAxIC4yNzguMjQzIDEuODEgMS44MSAwIDAgMSAuMjIzLjM0NnEuMS4xOTMuMTczLjM5M2wxLjEyNSAzLjA1OSAxLjE2LTMuMDc2YTEuNzI0IDEuNzI0IDAgMCAxIC4yNTgtLjQ5MiAxLjc0OCAxLjc0OCAwIDAgMSAuMzQtLjM0LjQzMi40MzIgMCAwIDEgLjE5LS4xNjcuNi42IDAgMCAxIC4yNDMtLjA1LjY1Ny42NTcgMCAwIDEgLjI4Ny4wNjQuNzc0Ljc3NCAwIDAgMSAuMjM3LjE3Ni44NTQuODU0IDAgMCAxIC4xNjEuMjUyQS43NTQuNzU0IDAgMCAxIDM3LTUuMWEuOTU1Ljk1NSAwIDAgMS0uMDcuMzM3cS0uMDcuMTg1LS4xMzUuMzQ5bC0yLjM1IDUuOTY1YTMuOTg4IDMuOTg4IDAgMCAxLS4xNjcuMzY5IDEuNjQ2IDEuNjQ2IDAgMCAxLS4yMDUuMzExLjk4NS45ODUgMCAwIDEtLjI1NS4yMTcuNjE2LjYxNiAwIDAgMS0uMzE2LjA4MiAxIDEgMCAwIDEtLjM0My0uMDU5LjgwOS44MDkgMCAwIDEtLjU0Mi0uNzc5IDEuMTc5IDEuMTc5IDAgMCAxIC4wODItLjM3MnEuMDc2LS4yLjE0MS0uMzg0em0xMy44MjctMS40ODNhLjc1OC43NTggMCAwIDEgLjMuMDYyLjc4Ni43ODYgMCAwIDEgLjI0OS4xNjcuNzg2Ljc4NiAwIDAgMSAuMTY3LjI0OS43NTguNzU4IDAgMCAxIC4wNjIuMy43NTguNzU4IDAgMCAxLS4wNjIuMy43ODYuNzg2IDAgMCAxLS4xNjcuMjQ5Ljc4Ni43ODYgMCAwIDEtLjI0OS4xNjcuNzU4Ljc1OCAwIDAgMS0uMy4wNjJoLTQuMDEzYS45NDYuOTQ2IDAgMCAxLS41MjctLjEzOCAxLjAyMSAxLjAyMSAwIDAgMS0uMzM4LS4zNTkgMS42MDYgMS42MDYgMCAwIDEtLjE3Ni0uNTEzIDMuNDIyIDMuNDIyIDAgMCAxLS4wNS0uNTg2di01Ljc3MmExLjE3NCAxLjE3NCAwIDAgMSAuMDg1LS40NDggMS4xNjYgMS4xNjYgMCAwIDEgLjIzMS0uMzYzIDEuMDY1IDEuMDY1IDAgMCAxIC4zNDMtLjI0MyAxLjAyNyAxLjAyNyAwIDAgMSAuNDI1LS4wODggMS4wMjcgMS4wMjcgMCAwIDEgLjQyNS4wODggMS4xIDEuMSAwIDAgMSAuMzQ2LjI0MyAxLjE0IDEuMTQgMCAwIDEgLjIzNC4zNjMgMS4xNzQgMS4xNzQgMCAwIDEgLjA4NS40NDhsLjAwMyA1LjgxMnptMy42NjItNi40MjFhLjY2My42NjMgMCAwIDEtLjA4OC4zNDMuOC44IDAgMCAxLS4yMjkuMjQ5IDEuMDE0IDEuMDE0IDAgMCAxLS4zMjUuMTQ5IDEuNDQ0IDEuNDQ0IDAgMCAxLS4zNzguMDUgMS40MTIgMS40MTIgMCAwIDEtLjM5LS4wNTMgMS4wMjQgMS4wMjQgMCAwIDEtLjMyNS0uMTU1Ljc3NC43NzQgMCAwIDEtLjIyMy0uMjQ5LjY3Mi42NzIgMCAwIDEtLjA4Mi0uMzM0LjYzOS42MzkgMCAwIDEgLjA3OS0uMzEzLjgxMi44MTIgMCAwIDEgLjIxNC0uMjQ5IDEgMSAwIDAgMSAuMzIyLS4xNjQgMS4zNjkgMS4zNjkgMCAwIDEgLjQxLS4wNTkgMS4zNjkgMS4zNjkgMCAwIDEgLjM3OC4wNTMgMS4wNjIgMS4wNjIgMCAwIDEgLjMyNS4xNTIuNzc2Ljc3NiAwIDAgMSAuMjI2LjI0Ni42NTMuNjUzIDAgMCAxIC4wODYuMzM0ek01MC42LTEuMTU0YTEuNCAxLjQgMCAwIDEtLjIyNi44NTUuODc2Ljg3NiAwIDAgMS0uNzQ3LjMuNzc3Ljc3NyAwIDAgMS0uNjk0LS4zIDEuNTIyIDEuNTIyIDAgMCAxLS4yLS44NTVWLTQuNzRhMS41MjIgMS41MjIgMCAwIDEgLjItLjg1NS43NzcuNzc3IDAgMCAxIC42OTQtLjMuODc2Ljg3NiAwIDAgMSAuNzQ3LjMgMS40IDEuNCAwIDAgMSAuMjI2Ljg1NXptMi44NjUtMy4xN2EuNC40IDAgMCAwIC4yLjM1NCAxLjgxNyAxLjgxNyAwIDAgMCAuNTUxLjIwOHEuMzM0LjA3Ni42ODYuMTQ2dC42ODYuMTYxYTUuMDE5IDUuMDE5IDAgMCAxIC42MjcuMjE0IDIuMDM4IDIuMDM4IDAgMCAxIC41MTYuMzA4IDEuMzQ4IDEuMzQ4IDAgMCAxIC4zNTIuNDQ1IDEuNCAxLjQgMCAwIDEgLjEyOS42MjQgMS43MDkgMS43MDkgMCAwIDEtLjE4Ny44MTIgMS43MjkgMS43MjkgMCAwIDEtLjUzLjYgMi42MTIgMi42MTIgMCAwIDEtLjgxNy4zODEgMy45ODMgMy45ODMgMCAwIDEtMS4wNTEuMTQxQTcuOTEgNy45MSAwIDAgMSA1My41NzggMGE0LjMyOSA0LjMyOSAwIDAgMS0uODk0LS4yMDggMS45MDYgMS45MDYgMCAwIDEtLjYyNC0uMzQ5LjYzNS42MzUgMCAwIDEtLjIzNC0uNDg5LjQ3My40NzMgMCAwIDEgLjE1OC0uMzgxLjYuNiAwIDAgMSAuNC0uMTM1Ljg2Ni44NjYgMCAwIDEgLjIyMy4wMzVxLjEyOS4wMzUuMjgxLjA4OGwuMzI1LjExNHEuMTczLjA2Mi4zNi4xMDhhNC4yMzggNC4yMzggMCAwIDAgLjQ4My4xIDMuMzg3IDMuMzg3IDAgMCAwIC41MTMuMDM4QTEuNjEgMS42MSAwIDAgMCA1NC45LTEuMWExLjAzOSAxLjAzOSAwIDAgMCAuMjg0LS4xLjY0NC42NDQgMCAwIDAgLjIwOC0uMTczLjUuNSAwIDAgMCAuMS0uMjU4LjUzNy41MzcgMCAwIDAgLjAyOS0uMDcuMjYuMjYgMCAwIDAgLjAxMi0uMDgyLjM4LjM4IDAgMCAwLS4xNDktLjI5MyAxLjA5IDEuMDkgMCAwIDAtLjQxOS0uMjA1cS0uNDUxLS4xMDUtLjg2MS0uMTkzdC0uNzU5LS4xODdhNC41NzcgNC41NzcgMCAwIDEtLjYzMy0uMjI5IDEuNzExIDEuNzExIDAgMCAxLS40OC0uMzE2IDEuMyAxLjMgMCAwIDEtLjMtLjQ1MSAxLjY3OSAxLjY3OSAwIDAgMS0uMTA4LS42MzlBMS40MiAxLjQyIDAgMCAxIDUyLTUuMDI0YTEuNTQ1IDEuNTQ1IDAgMCAxIC41My0uNTM2IDIuNzMxIDIuNzMxIDAgMCAxIC44MzgtLjMzMSA0Ljk0IDQuOTQgMCAwIDEgMS4xMTMtLjExNCA0LjIyNSA0LjIyNSAwIDAgMSAxLjcuMjY3cS41ODMuMjY3LjU4My42OTRhLjQ0LjQ0IDAgMCAxLS4xNTguMzY2LjU5Mi41OTIgMCAwIDEtLjM4MS4xMjYuNzM3LjczNyAwIDAgMS0uMjQzLS4wNDRxLS4xMjYtLjA0NC0uMy0uMWEzLjQyMSAzLjQyMSAwIDAgMC0uNDE5LS4xIDMuNDUzIDMuNDUzIDAgMCAwLS42LS4wNDQgNC42NDMgNC42NDMgMCAwIDAtLjQ4OS4wMjMgMS41MjkgMS41MjkgMCAwIDAtLjM3NS4wODIuNTc0LjU3NCAwIDAgMC0uMjQuMTU4LjM3NS4zNzUgMCAwIDAtLjA5Mi4yNTN6bTUuMzQ0LTEuNTk0bC4xMjktMS4yMTNBMi40NTUgMi40NTUgMCAwIDEgNTktNy40ODJhMS4wMzcgMS4wMzcgMCAwIDEgLjE0MS0uMzIyLjcyOS43MjkgMCAwIDEgLjI2MS0uMjM3Ljg4Ljg4IDAgMCAxIC40MjgtLjA5MS42MTUuNjE1IDAgMCAxIC41Ni4yNyAxLjUgMS41IDAgMCAxIC4xNzMuOHYxLjE0M2guNjU2YS43NTcuNzU3IDAgMCAxIC40ODYuMTQ5LjU2Ny41NjcgMCAwIDEgLjE4OC40NzIuNTI1LjUyNSAwIDAgMS0uMi40NDguODc5Ljg3OSAwIDAgMS0uNTM5LjE0OWgtLjU5MnYyLjIxNXEwIC4zNTIuMDEyLjZhMS4yMTEgMS4yMTEgMCAwIDAgLjA3Ni40LjQyMi40MjIgMCAwIDAgLjE5My4yMjMuODEzLjgxMyAwIDAgMCAuMzY5LjA2N3EuMTcgMCAuMzMxLjAxNWEuODMyLjgzMiAwIDAgMSAuMjg0LjA3My40NjcuNDY3IDAgMCAxIC4yLjE3My41NzcuNTc3IDAgMCAxIC4wNzMuMzEzLjU0My41NDMgMCAwIDEtLjExMS4zNTcuNzA3LjcwNyAwIDAgMS0uMzE5LjIwOCAyLjA3NiAyLjA3NiAwIDAgMS0uNS4xcS0uMjkuMDI2LS42NDcuMDI2YTIuMzY2IDIuMzY2IDAgMCAxLS43NDctLjEyMyAxLjQ0NyAxLjQ0NyAwIDAgMS0uNTgtLjM3MiAxLjcgMS43IDAgMCAxLS4zNzUtLjY2MiAzLjI3NiAzLjI3NiAwIDAgMS0uMTMyLTFWLTQuN2gtLjI3YS44OS44OSAwIDAgMS0uNTI3LS4xNDkuNTUxLjU1MSAwIDAgMS0uMjExLS40ODMuNTYzLjU2MyAwIDAgMSAuMTY3LS40MjUuNy43IDAgMCAxIC41MDctLjE2MXoiIGNsYXNzPSJjbHMtMiIgZGF0YS1uYW1lPSJQYXRoIDUwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTU4IDE0Ni43NDMpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);  }

  .multiselect-box .list-group-item:nth-child(even),
  .multiselect-box .list-group-item:hover {
    background-color: #f5f1f1;
  }

</style>
