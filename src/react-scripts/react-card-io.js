import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

const app = angular.module('app', ['react']);

app.controller('helloController', function($scope) {
  $scope.onClick=function() {
    let fname = $scope.person.fname;
  };
  $scope.reactProps = {
    fname: $scope.person,
  }
});

var CardIOExample = React.createClass({

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload()
    }
  }

  scanCard() {
    CardIOModule.scanCard()
      .then(card => {
        // the scanned card
      })
      .catch(() => {
        // the user cancelled
      })
  }

  render: function() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.scanCard.bind(this)}>
          <Text>Scan card!</Text>
        </TouchableOpacity>
      </View>
    );
  }

})
app.value('CardIOExample ', CardIOExample);
