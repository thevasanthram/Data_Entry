Object.keys(defectCountProvider).map((category) => {
  Object.keys(defectCountProvider[category]).map((defectName) => {
    switch (defectName) {
      case 'Surface':
        sortedIndividualCountProvider[0][category] =
          defectCountProvider[category][defectName];
        break;
      case 'Body Fitting':
        if (category == 'LH SHELL BODY SUB-LINE_FRONT DOOR INNER - LH') {
          console.log('category: ', category);
          console.log(
            'sortedIndividualCountProvider[1][category]: Before',
            sortedIndividualCountProvider[1][category]
          );
        }
        sortedIndividualCountProvider[1][category] =
          defectCountProvider[category][defectName];
        if (category == 'LH SHELL BODY SUB-LINE_FRONT DOOR INNER - LH') {
          console.log(
            'sortedIndividualCountProvider[1][category]: After',
            sortedIndividualCountProvider[1][category]
          );
        }
        break;
      case 'Missing & Wrong Part':
        sortedIndividualCountProvider[2][category] =
          defectCountProvider[category][defectName];
        break;
      case 'Welding':
        sortedIndividualCountProvider[3][category] =
          defectCountProvider[category][defectName];
        break;
      case 'Water Leak':
        sortedIndividualCountProvider[4][category] =
          defectCountProvider[category][defectName];
        break;
      default:
        break;
    }
  });
});
