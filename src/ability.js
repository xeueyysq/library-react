import { AbilityBuilder, Ability } from '@casl/ability';

export function defineAbilitiesFor(user) {
    const { can, cannot, rules } = new AbilityBuilder(Ability);

    if (user?.role === 'библиотекарь') {
        can('manage', 'Book');
        cannot('borrow', 'Book');
        cannot('return', 'Book');
        cannot('read', 'Borrowing'); 
    } else if (user?.role === 'читатель') {
        can('read', 'Book');
        can('borrow', 'Book');
        can('return', 'Book');
        can('read', 'Borrowing', { user_id: user.id });
    } else {
        can('read', 'Book');
    }

    return new Ability(rules);
}
