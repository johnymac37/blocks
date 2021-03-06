import React from 'react';
import {mount} from 'enzyme';
import {CollaboratorToken} from '../../src/ui/ui';

describe('StaticCollaboratorToken', () => {
    it('renders outside of a blocks context', () => {
        mount(
            <CollaboratorToken.Static
                collaborator={{name: 'Kid Adultman', email: 'kid@trenchcoats4u.com'}}
            />,
        );
    });
});
