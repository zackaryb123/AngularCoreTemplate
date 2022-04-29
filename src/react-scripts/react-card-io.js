const app = angular.module('app', ['react']);

app.controller('helloController', function($scope) {
  $scope.onClick=function() {
    let fname = $scope.person.fname;
  };
  $scope.reactProps = {
    fname: $scope.person,
  }
});


/** @jsx React.DOM */
app.factory('HelloComponent', function($filter) {
  return React.createClass({
    propTypes: {
      person: React.PropTypes.object.isRequired
    },
    scanCard: () => {
      CardIOModule.scanCard()
        .then(card => {
          // the scanned card
        })
        .catch(() => {
          // the user cancelled
        })
    },
    render: function() {
      return (
        `<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.scanCard.bind(this)}>
            <Text>Scan card!</Text>
          </TouchableOpacity>
        </View>`
      );
    }
  });
});

// app.value('CardIOExample ', CardIOExample);
