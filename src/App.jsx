import React, { Component, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import Present from './Present';
import './index.css'

const videoSrc = require('./video/skystar.mp4');

const PageView = props => {

  const [showPresent, setShowPresent] = useState(false);
  const myInterval = useRef()
  const isNum = useRef();
  isNum.current = 3
  const [count, setCount] = useState(3)
  const [showTime, steShowTime] = useState(false)
  const [userName, setUserName] = useState('')

  /**
   * 网页全屏
   */
  const areFullscreen = () => {
    if (!document.fullscreen) {
      document.body.requestFullscreen();
    }
  }

  const interval = () => {
    let num = count
    myInterval.current = setInterval(() => {
      console.log(num);
      if (num <= 0) {
        console.log('小于等于0');
        areClearInterval()
        setShowPresent(true)
        areFullscreen();
      }
      setCount(--num)
    }, 1000)
  }

  const areClearInterval = () => {
    clearInterval(myInterval.current)
    // setCount(3)
  }

  /**
     * 获取url?后面的参数值
     * @param name 所要获取的参数名
     * 
     * eg:
     *  https://www.baidu.com?param1=111&parma2=222
     *  GetQueryString('param1') ---> 111
     */
  const GetQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substring(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  useEffect(() => {
    let userName = GetQueryString('userName')
    setUserName(userName)
  }, [])

  useEffect(
    () => {
      clearInterval(myInterval.current)
      //由于更新时清除了, 所以要重新模拟一下点击时的操作, 确保继续运行
      // interval()  // 如果有bug，试试注释掉这一句
      //更新时清除掉interval
      return () => clearInterval(myInterval.current)
    }, [])


  return (
    <>
      {
        showPresent
          ?
          null
          :
          <div className="printer-div">
            嘿嘿，{userName ? `${userName}，` : ''}亲爱的美丽的大方的温柔的善良的老婆，请开启你的小惊喜^_^
            &nbsp;
            <button onClick={() => {
              console.log('点了这个按钮');
              steShowTime(true);
              interval();
            }}>按我按我</button>
          </div>
      }
      {
        showTime
          ?
          <div className='time-div'>{showPresent ? null : (count >= 1 ? <h3>仅剩：<b>{count}秒</b></h3> : <h2>咚咚！要出现了！</h2>)}</div>
          :
          null
      }
      {showPresent ? <Present videoSrc={videoSrc}></Present> : null}
      {/* <Present></Present>
      <div style={{ width: '400px', height: '200px', border: '2px solid red' }}>
        <video width={'400px'} height={'200px'} src={require('./video/skystar.mp4')} controls></video>
      </div> */}
    </>
  )
}

export default PageView;