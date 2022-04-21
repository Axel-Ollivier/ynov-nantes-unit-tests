Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
});

Scenario('Test Ynov Nantes Search ForBachelor Informatique', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('a[href="/recherche/"]');
    I.appendField('input[name="s"]', 'bachelor informatique');
    I.wait(5);
    I.see('Bachelor Informatique');
});