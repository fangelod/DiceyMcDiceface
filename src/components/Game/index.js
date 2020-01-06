import { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const styles = () => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subcontainer: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sides: 6,
      started: false,
      win: false,
    };

    this.initResults = this.initResults.bind(this);
    this.reset = this.reset.bind(this);
    this.roll = this.roll.bind(this);
  }

  componentDidMount() {
    this.setState({ results: this.initResults() });
  }

  initResults() {
    let obj = Map();
    for (let i = 1; i <= this.state.sides; i++) {
      obj = obj.setIn([i.toString()], 0);
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
    const { classes } = this.props;

    let tableContent;
    if (this.state.results) {
      tableContent = this.state.results.keySeq().map(side => {
        const count = this.state.results.get(side);
        return (
          <TableRow key={side} selected={count === 5}>
            <TableCell component={'th'}>{side}</TableCell>
            <TableCell>{count}</TableCell>
          </TableRow>
        );
      });
    }

    return (
      <div className={classes.container}>
        <div style={{ height: '35%' }}>
          <img
            src={'https://cdn.pixabay.com/photo/2016/03/31/19/19/dice-1294902_960_720.png'}
            style={{
              height: '100%',
            }}
          />
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
        <div className={classes.subcontainer}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableContent}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Game);
