Feature('Workshop - E2E Tests');

Scenario('Test Workshop landpage', ({I}) => {
    I.amOnPage('http://localhost:5000/');
});

Scenario('Test create To-Do', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('#newTODO', 'Test To-Do2');
    I.click('Create');
    locate('#todo-body')
        .inside(locate('td').withText('Test To-Do'))
});

Scenario('Test set Done To-Do', ({I}) => {
    I.amOnPage('http://localhost:5000/');
    I.fillField('#newTODO', 'Test To-Do2');
    I.click('Create');
    locate('#todo-body')
        .inside(locate('td').withText('Test To-Do'))
    I.click('Done');
    locate('#done-body')
        .inside(locate('td').withText('Test To-Do'))
});