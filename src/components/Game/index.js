import { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = () => ({

});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.initResults(),
      sides: 6,
      started: false,
      win: true,
    };

    this.reset = this.reset.bind(this);
    this.roll = this.roll.bind(this);
  }

  initResults() {
    let obj = Map();
    for (let i = 1; i <= this.state.sides; i++) {
      obj = obj.set(i.toString(), 0);
    }
    return obj;
  }

  reset() {
    this.setState({
      results: this.initResults(),
      started: false,
      win: false,
    });
  }

  roll() {
    const num = Math.floor(Math.random() * ((this.state.sides - 1) + 1) + 1);
    if (!this.state.started) {
      this.setState({ started: true });
    }

    const oldCount = this.state.results.get(num.toString());

    if (oldCount === 4) {
      this.setState({ win: true });
    }

    this.setState({
      results: this.state.results.set(num.toString(), oldCount + 1),
    });
  }

  render() {
    return (
      <div>
        <div>
          Animations Here
        </div>
        <div>
          <Button
            variant={'contained'}
            disabled={!this.state.started}
            size={'large'}
            onClick={() => this.reset()}
          >
            Reset
          </Button>
          <Button
            variant={'contained'}
            disabled={this.state.win}
            size={'large'}
            onClick={() => this.roll()}
          >
            Roll
          </Button>
        </div>
        <div>
          Results Here
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Game);
