<template>
  <div class="home">
    <div class="header-container">
        <div class="left-container">
            <div class="img-container">
                {{avatar}}
            </div>
        </div>
        <div class="right-container">
            <p>{{name}}</p>
            <p>{{`${department}-${position}`}}</p>
        </div>
    </div>
    <div class="item-container">
        <div class="item-header">
            <span class="item-text">应用</span>
            <span class="item-link">更多<i></i></span>
        </div>
        <div class="">

        </div>
    </div>
    <div>
        <ul>
            <li>
                news
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      avatar: 'avatar',
      name: '李馥亦',
      department: '移动平台',
      position: '组员',
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../theme.styl';

.home {
    display: flex;
    flex-direction: column;
    background-color: $background-color;

    .header-container {
        display: flex;
        height: 100px;
        background-color: $color-orange;

        // background: linear-gradient(to right,white $color-orange)
        // background: linear-gradient(to right, #F9BC82, $color-orange);
        .left-container {
            width: 100px;
            display: flex;
            justify-content: center;
            align-self: center;

            .img-container {
                width: 60px;
                height: 60px;
                background-color: $color-grey;
                color: white;
                line-height: 60px;
                text-align: center;
                border-radius: 50%;
            }
        }

        .right-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: white;
            padding: 15px;
        }
    }

    .item-container {
        margin-top: 10px;
        background-color: white;

        .item-header {
            height: 30px;
            padding: 0 20px;
            border-bottom: 1px solid $color-light-grey-opacity;
            display: flex;
            justify-content: space-between;
            align-item: center;

            >span {
                line-height: 30px;
                position: relative;

                &:first-child {
                    &:after {
                        left: -10px;
                        content: '';
                        position: absolute;
                        width: 5px;
                        height: 18px;
                        background-color: $color-orange;
                        top: 5px;
                    }
                }
            }
        }
    }
}
</style>
