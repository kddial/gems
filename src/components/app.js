import React, { Component } from 'react';
import { List, Map } from 'immutable';
import Canvas from './canvas';
import Gem from './gem';
import Toolbar from './toolbar';
import BlurFilter from './blur-filter';
import About from './about';

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { gems, canvas } = this.props;
    const {
      setProcessBlue,
      setPatriot,
      addGlow,
      removeGlow,
      toggleAbout,
    } = this.props;

    return (
      <div onMouseMove={ this.handleMouseMove }
        onTouchMove={ this.handleTouchMove }>
        <Toolbar
          onLeftClick={ setPatriot }
          onRightClick={ setProcessBlue } />

        <Canvas bgColor={ canvas.get('bgColor') }
          w={ canvas.get('w') }
          h={ canvas.get('h') }>

          <BlurFilter />
          {
            gems.map((gem, idx) => (
              <Gem key={ idx }
                idx={ idx }
                glow={ gem.get('glow') }
                centerCut={ gem.get('centerCut') }
                cuts={ gem.get('cuts') }
                addGlow={ addGlow }
                removeGlow={ removeGlow } />
            ))
          }
        </Canvas>

        <div className="fixed bottom-0 left-0 caps m2 h6 flex items-center center px1 bold black"
          style={{ height: '2rem', backgroundColor: '#fff', cursor: 'pointer' }}
          onClick={ toggleAbout }>
          About
        </div>

        <About isVisible={ canvas.get('isAboutVisible') }
          toggleAbout={ toggleAbout } />

      </div>
    );
  }

  handleMouseMove = (e) => {
    e.preventDefault();
    this.props.moveLight(e.clientX, e.clientY);
  }

  handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.targetTouches[0];
    this.props.moveLight(touch.clientX, touch.clientY);
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  canvas: React.PropTypes.instanceOf(Map).isRequired,
  gems: React.PropTypes.instanceOf(List).isRequired,
  windowResize: React.PropTypes.func.isRequired,
  setProcessBlue: React.PropTypes.func.isRequired,
  setPatriot: React.PropTypes.func.isRequired,
  moveLight: React.PropTypes.func.isRequired,
  addGlow: React.PropTypes.func.isRequired,
  removeGlow: React.PropTypes.func.isRequired,
  toggleAbout: React.PropTypes.func.isRequired,
};

export default App;
